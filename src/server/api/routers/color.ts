import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const colorRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    if (!ctx.session?.user.id) {
      throw new Error("User must be logged in to view bottle format records");
    }
    return ctx.prisma.color.findMany();
  }),
  getOne: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      if (!ctx.session?.user.id) {
        throw new Error("User must be logged in to view bottle format records");
      }
      return ctx.prisma.color.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
});
