import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const getRouter = createTRPCRouter({
  getUser: protectedProcedure
    .input(z.object({ email: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });
    }),

  getUsersRole: protectedProcedure
    .input(z.array(z.string()))
    .query(async ({ ctx, input }) => {
      const usersWithMessages = await ctx.db.user.findMany({
        where: {
          email: {
            in: input,
          },
        },
        include: {
          UserInstitution: {
            select: {
              role: true,
            },
          },
        },
      });

      return usersWithMessages;
    }),
});
