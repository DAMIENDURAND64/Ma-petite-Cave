import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const bottleFormat = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.bottleFormat.findMany({});
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.bottleFormat.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
});
