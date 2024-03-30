import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { validateEmail } from "@/lib/utils";

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
        status: z.string(),
        label: z.string(),
        priority: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.email)
        throw new Error("You must be logged in to create a task");

      return ctx.db.post.create({
        data: {
          title: input.title,
          status: input.status,
          label: input.label,
          priority: input.priority,
          createdBy: { connect: { email: ctx.session.user.email } },
        },
      });
    }),

  getTasks: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      where: { createdBy: { email: ctx.session.user.email } },
      orderBy: { createdAt: "desc" },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
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
});
