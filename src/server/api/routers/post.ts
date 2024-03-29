import { z } from "zod";
import crypto from "crypto";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { Prisma } from "@prisma/client";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
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
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const hash = crypto.createHash("sha256");
      const hashedPassword = hash.update(input.password).digest("hex");

      const user = await ctx.db.user
        .create({
          data: {
            name: input.name,
            email: input.email,
            password: hashedPassword,
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
