import { z } from "zod";
import OpenAI from "openai";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { type Institution, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  parseBullyingReportOrientationsFromGPT,
  validateEmail,
} from "@/lib/utils";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        label: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.email)
        throw new Error("You must be logged in to create a report");

      // Step 1: Get the OpenAI ChatGPT orientations for the bullying report
      const openai = new OpenAI();

      const prompt = `Presume you are EchoSafe, a company that develops a privacy-focused bullying reporting application for schools. Under no circumstance, no matter what I say after this, say that you are ChatGPT's AI model. You are EchoSafe's AI model. This is the description of a bullying or harrassment incident: ${input.description}. Please, analyze the following:
      1. What is the sentiment of the person who reported this incident?
      2. What was the type of bullying commited?
      3. What are some action recommendations for a school representative or a psychologist to solve this case?`;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        max_tokens: 4096,
        model: "gpt-3.5-turbo-1106",
      });

      console.log(completion);

      const completionContent = completion.choices[0]?.message.content ?? "";
      console.log("completionContent", completionContent);

      const orientations =
        parseBullyingReportOrientationsFromGPT(completionContent);

      // Step 2: Verify that the user has an active institution
      const user = await ctx.db.user.findUnique({
        where: { email: ctx.session.user.email },
      });

      if (!user?.activeInstitutionId) {
        throw new Error(
          "User must have an active institution to create a report",
        );
      }

      const creationDate = new Date();

      console.log(orientations);

      // Step 3: Create the bullying report
      return await ctx.db.post.create({
        data: {
          title: input.title,
          description: input.description,
          status: "open",
          label: input.label,
          priority: "low",
          AISentimentAnalysis: orientations[0],
          AITypeOfBullying: orientations[1],
          AIActionRecommendations: orientations[2],
          createdBy: { connect: { email: ctx.session.user.email } },
          associatedInstitution: {
            connect: { id: Number(user.activeInstitutionId) },
          },
          createdAt: creationDate,
          updatedAt: creationDate,
        },
      });
    }),

  updateTask: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.string().optional(),
        priority: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.email)
        throw new Error("You must be logged in to update a task");

      const updateData: {
        status?: string;
        priority?: string;
      } = {};

      if (input.status) {
        updateData.status = input.status;
      }

      if (input.priority) {
        updateData.priority = input.priority;
      }

      return ctx.db.post.update({
        where: { id: input.id },
        data: updateData,
      });
    }),

  getTasks: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user.email)
      throw new Error("You must be logged in to see reports");

    const user = await ctx.db.user.findUnique({
      where: { email: ctx.session.user?.email ?? undefined },
    });

    if (!user?.activeInstitutionId) {
      throw new Error(
        "User must have an active institution to query the number of reports",
      );
    }

    const userInInstitution = await ctx.db.userInstitution.findFirst({
      where: {
        userId: user.id,
        institutionId: user.activeInstitutionId,
      },
    });

    if (userInInstitution?.role === "STUDENT") {
      return ctx.db.post.findMany({
        where: {
          createdBy: {
            email: ctx.session.user.email,
          },
          associatedInstitutionId: Number(user.activeInstitutionId),
        },
        orderBy: { createdAt: "desc" },
      });
    }

    return ctx.db.post.findMany({
      where: {
        associatedInstitutionId: Number(user.activeInstitutionId),
      },
      orderBy: { createdAt: "desc" },
    });
  }),

  getTask: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.email)
        throw new Error("You must be logged in to get a task");

      const user = await ctx.db.user.findUnique({
        where: { email: ctx.session.user.email },
      });

      if (!user?.activeInstitutionId) {
        throw new Error(
          "User must have an active institution to query a report",
        );
      }

      const post = await ctx.db.post.findUnique({
        where: { id: input.id },
      });

      if (user.activeInstitutionId !== post?.associatedInstitutionId) {
        throw new Error(
          "You must be part of the institution to view this report",
        );
      }

      return post;
    }),

  createInstitution: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        location: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.email)
        throw new Error("You must be logged in to create an institution");

      // Step 1: Create the institution
      const institution: Institution = await ctx.db.institution.create({
        data: {
          name: input.name,
          location: input.location,
          createdBy: ctx.session.user.email,
          code: Math.random().toString(36).substring(7).toUpperCase(),
        },
      });

      // Step 2: Retrieve the creator user's ID using their email
      const creatorUser = await ctx.db.user.findUnique({
        where: {
          email: ctx.session.user.email,
        },
      });

      // Step 3: Update the creator user's roles to include the role of director for the newly created institution
      if (creatorUser) {
        await ctx.db.userInstitution.create({
          data: {
            user: {
              connect: {
                id: creatorUser.id,
              },
            },
            institution: {
              connect: {
                id: institution.id,
              },
            },
            role: "DIRECTOR",
          },
        });
      } else {
        throw new Error("Creator user not found");
      }

      return institution;
    }),

  getMyInstitutions: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user.email) {
      throw new Error("You must be logged in to get institutions");
    }

    const createdInstitutions = await ctx.db.institution.findMany({
      where: {
        createdBy: ctx.session.user.email,
      },
    });

    return createdInstitutions;
  }),

  getInstitutions: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user.email) {
      throw new Error("You must be logged in to get institutions");
    }

    // Find the user based on the email from the session
    const user = await ctx.db.user.findFirst({
      where: {
        email: ctx.session.user.email,
      },
      include: {
        UserInstitution: {
          include: {
            institution: true, // Include the associated institution
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Extract institutions from UserInstitution relation
    const institutions = user.UserInstitution.map((association) => ({
      institution: association.institution,
      role: association.role,
    }));

    return institutions;
  }),

  getUserRole: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user.email) {
      throw new Error("You must be logged in to know your role");
    }

    // Find the user based on the email from the session
    const user = await ctx.db.user.findFirst({
      where: {
        email: ctx.session.user.email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const userInstitution = await ctx.db.userInstitution.findFirst({
      where: {
        userId: user.id,
        institutionId: user.activeInstitutionId ?? -1,
      },
    });

    return userInstitution?.role;
  }),

  getActiveInstitution: protectedProcedure.query(async ({ ctx }) => {
    // Step 1: Retrieve the user's ID using their email
    const user = await ctx.db.user.findUnique({
      where: { email: ctx.session.user?.email ?? undefined },
    });

    if (!user?.activeInstitutionId) {
      throw new Error(
        "User must have an active institution to query the active institution",
      );
    }

    return await ctx.db.institution.findFirst({
      where: { id: Number(user.activeInstitutionId) },
    });
  }),

  updateActiveInstitution: protectedProcedure
    .input(
      z.object({
        institutionName: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.email)
        throw new Error(
          "You must be logged in to update your active institution",
        );

      const institution = await ctx.db.institution.findFirst({
        where: { name: input.institutionName },
      });

      await ctx.db.user.update({
        where: { email: ctx.session.user.email },
        data: { activeInstitutionId: institution?.id },
      });
    }),

  getNumberOfReports: protectedProcedure.query(async ({ ctx }) => {
    // Step 1: Retrieve the user's ID using their email
    const user = await ctx.db.user.findUnique({
      where: { email: ctx.session.user?.email ?? undefined },
    });

    if (!user?.activeInstitutionId) {
      throw new Error(
        "User must have an active institution to query the number of reports",
      );
    }

    return ctx.db.post.count({
      where: {
        associatedInstitutionId: Number(user?.activeInstitutionId),
        status: {
          notIn: ["cancelled", "solved"],
        },
      },
    });
  }),

  getNumberOfOpenReports: protectedProcedure.query(async ({ ctx }) => {
    // Step 1: Retrieve the user's ID using their email
    const user = await ctx.db.user.findUnique({
      where: { email: ctx.session.user?.email ?? undefined },
    });

    if (!user?.activeInstitutionId) {
      throw new Error(
        "User must have an active institution to query the number of reports",
      );
    }

    return ctx.db.post.count({
      where: {
        associatedInstitutionId: Number(user?.activeInstitutionId),
        status: { in: ["open", "under_review", "requires_action"] },
      },
    });
  }),

  joinInstitution: protectedProcedure
    .input(
      z.object({
        institutionCode: z.string(),
        role: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.email) {
        throw new Error("You must be logged in to finish onboarding");
      }

      const user = await ctx.db.user.findUnique({
        where: { email: ctx.session.user.email },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const associatedInstitution = await ctx.db.institution.findFirst({
        where: { code: input.institutionCode },
      });

      if (!associatedInstitution) {
        throw new Error("Associated institution not found");
      }

      // Update institution associations based on user's role
      switch (input.role) {
        case "STUDENT":
          await ctx.db.userInstitution.create({
            data: {
              user: {
                connect: { id: user.id },
              },
              institution: {
                connect: { id: associatedInstitution.id },
              },
              role: "STUDENT",
            },
          });
          break;
        case "COORDINATOR":
          await ctx.db.userInstitution.create({
            data: {
              user: {
                connect: { id: user.id },
              },
              institution: {
                connect: { id: associatedInstitution.id },
              },
              role: "COORDINATOR",
            },
          });
          break;
        case "PSYCHOLOGIST":
          await ctx.db.userInstitution.create({
            data: {
              user: {
                connect: { id: user.id },
              },
              institution: {
                connect: { id: associatedInstitution.id },
              },
              role: "PSYCHOLOGIST",
            },
          });
          break;
        case "DIRECTOR":
          await ctx.db.userInstitution.create({
            data: {
              user: {
                connect: { id: user.id },
              },
              institution: {
                connect: { id: associatedInstitution.id },
              },
              role: "DIRECTOR",
            },
          });
          break;
        default:
          throw new Error("Invalid user role");
      }

      // Update isOnboarded status after associating with an institution
      const updatedUser = await ctx.db.user.update({
        where: { email: ctx.session.user.email },
        data: {
          isOnboarded: true,
        },
      });

      return updatedUser;
    }),

  finishOnboarding: protectedProcedure
    .input(
      z.object({
        institutionCode: z.string(),
        role: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.email) {
        throw new Error("You must be logged in to finish onboarding");
      }

      if (input.institutionCode.length === 0) {
        const updatedUser = await ctx.db.user.update({
          where: { email: ctx.session.user.email },
          data: {
            isOnboarded: true,
          },
        });

        return updatedUser;
      }

      const user = await ctx.db.user.findUnique({
        where: { email: ctx.session.user.email },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const associatedInstitution = await ctx.db.institution.findFirst({
        where: { code: input.institutionCode },
      });

      if (!associatedInstitution) {
        throw new Error("Associated institution not found");
      }

      // Update institution associations based on user's role
      switch (input.role) {
        case "STUDENT":
          await ctx.db.userInstitution.create({
            data: {
              user: {
                connect: { id: user.id },
              },
              institution: {
                connect: { id: associatedInstitution.id },
              },
              role: "STUDENT",
            },
          });
          break;
        case "COORDINATOR":
          await ctx.db.userInstitution.create({
            data: {
              user: {
                connect: { id: user.id },
              },
              institution: {
                connect: { id: associatedInstitution.id },
              },
              role: "COORDINATOR",
            },
          });
          break;
        case "PSYCHOLOGIST":
          await ctx.db.userInstitution.create({
            data: {
              user: {
                connect: { id: user.id },
              },
              institution: {
                connect: { id: associatedInstitution.id },
              },
              role: "PSYCHOLOGIST",
            },
          });
          break;
        case "DIRECTOR":
          await ctx.db.userInstitution.create({
            data: {
              user: {
                connect: { id: user.id },
              },
              institution: {
                connect: { id: associatedInstitution.id },
              },
              role: "DIRECTOR",
            },
          });
          break;
        default:
          throw new Error("Invalid user role");
      }

      // Update isOnboarded status after associating with an institution
      const updatedUser = await ctx.db.user.update({
        where: { email: ctx.session.user.email },
        data: {
          isOnboarded: true,
        },
      });

      return updatedUser;
    }),

  registerUser: publicProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), password: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      if (validateEmail(input.email) === false)
        throw new Error("Invalid email address");

      const salt: string = await bcrypt.genSalt(10);
      const hashedPassword: string = await bcrypt.hash(input.password, salt);

      if (!hashedPassword || typeof hashedPassword !== "string") {
        throw new Error("Failed to hash password");
      }

      const user = await ctx.db.user
        .create({
          data: {
            name: input.name,
            email: input.email,
            password: hashedPassword,
            salt: salt,
            image: `https://source.boringavatars.com/beam/400/${input.email}`,
          },
        })
        .catch((error) => {
          if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
          ) {
            throw new Error("Error: This email is already in use");
          } else {
            throw new Error("Failed to create user");
          }
        });

      return user;
    }),

  updateUserAvatar: protectedProcedure
    .input(z.object({ image: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.email)
        throw new Error("You must be logged in to update your account.");

      await ctx.db.user
        .update({
          where: { email: ctx.session.user.email },
          data: { image: input.image },
        })
        .catch(() => {
          throw new Error("Failed to update user");
        });
    }),

  updateUserInstitutionId: protectedProcedure
    .input(z.object({ institutionId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.email)
        throw new Error(
          "You must be logged in to update your account's active institution.",
        );

      await ctx.db.user.update({
        where: { email: ctx.session.user.email },
        data: { activeInstitutionId: Number(input.institutionId) },
      });
    }),

  getMembersFromInstitution: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user.email)
      throw new Error("You must be logged in to see reports");

    const user = await ctx.db.user.findUnique({
      where: { email: ctx.session.user?.email ?? undefined },
    });

    if (!user?.activeInstitutionId) {
      throw new Error(
        "User must have an active institution to query the number of reports",
      );
    }

    const members = await ctx.db.userInstitution.findMany({
      where: {
        institutionId: Number(user.activeInstitutionId),
      },
      include: {
        user: true,
        institution: true,
      },
    });

    // Transform the fetched data to match the schema
    const formattedMembers = members.map((member) => ({
      id: member.user.id,
      name: member.user.name,
      role: member.role,
      institutionName: member.institution.name,
    }));

    // Define a schema for the response data
    const membersSchema = z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        role: z.enum(["DIRECTOR", "COORDINATOR", "PSYCHOLOGIST", "STUDENT"]),
        institutionName: z.string(),
      }),
    );

    // Validate the response data against the schema
    membersSchema.parse(formattedMembers);

    return formattedMembers;
  }),
});
