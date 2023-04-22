import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const wineRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.wine.findMany({
      where: {
        userId: ctx.session?.user.id,
      },
      include: {
        Grapes: {
          include: {
            grape: true,
          },
        },
        color: true,
        user: true,
      },
    });
  }),
  getAllByColor: publicProcedure
    .input(z.object({ colorId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.wine.findMany({
        where: {
          colorId: input.colorId,
          userId: ctx.session?.user.id,
        },
        include: {
          Grapes: {
            include: {
              grape: true,
            },
          },
          color: true,
          user: true,
        },
      });
    }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.wine.findFirst({
        where: {
          id: input.id,
        },
        include: {
          Grapes: {
            include: {
              grape: true,
            },
          },
          color: true,
          user: true,
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        year: z.number(),
        type: z.string(),
        country: z.string(),
        colorId: z.string(),
        region: z.string(),
        price: z.number(),
        quantity: z.number(),
        grapes: z.array(z.string()),
        user: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const color = await ctx.prisma.color.findUnique({
        where: {
          id: input.colorId,
        },
      });
      if (!color) {
        throw new Error(`Invalid color id: ${input.colorId}`);
      }
      return ctx.prisma.wine.create({
        data: {
          name: input.name,
          year: input.year,
          color: { connect: { id: input.colorId } },
          type: input.type,
          country: input.country,
          region: input.region,
          price: input.price,
          quantity: input.quantity,
          Grapes: {
            connect: input.grapes.map((grape) => ({ id: grape })),
          },
          user: {
            connect: {
              id: input.user,
            },
          },
        },
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        year: z.number(),
        type: z.string(),
        country: z.string(),
        region: z.string(),
        price: z.number(),
        quantity: z.number(),
        grapes: z.array(z.string()),
        colorId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const wine = await ctx.prisma.wine.findUnique({
        where: {
          id: input.id,
        },
        include: {
          color: true,
        },
      });
      if (!wine) {
        throw new Error(`Invalid wine id: ${input.id}`);
      }
      const color = await ctx.prisma.color.findUnique({
        where: {
          id: input.colorId,
        },
      });
      if (!color) {
        throw new Error(`Invalid color id: ${input.colorId}`);
      }
      return ctx.prisma.wine.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          year: input.year,
          type: input.type,
          country: input.country,
          region: input.region,
          price: input.price,
          quantity: input.quantity,
          Grapes: {
            connect: input.grapes.map((grape) => ({ id: grape })),
          },
          color: {
            connect: {
              id: input.colorId,
            },
          },
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.wine.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
