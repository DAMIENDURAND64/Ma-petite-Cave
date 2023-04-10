import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const grapesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.grape.findMany();
  }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.grape.findFirst({
        where: {
          id: input.id,
        },
      });
    }),

  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.grape.create({
        data: {
          name: input.name,
        },
      });
    }),
  update: publicProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.grape.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.grape.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
