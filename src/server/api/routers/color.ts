import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const colorRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.color.findMany();
  }),
  getOne: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.color.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
});
