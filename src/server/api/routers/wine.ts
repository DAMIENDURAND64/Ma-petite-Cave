import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const wineRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    if (!ctx.session?.user.id) {
      throw new Error("User must be logged in to view wine records");
    }
    return ctx.prisma.wine.findMany({
      where: {
        ownerId: ctx.session?.user.id,
      },
      include: {
        wineColor: true,
        wineBottles: {
          include: {
            format: {
              select: {
                name: true,
              },
            },
          },
        },
        tastingNotes: true,
      },
    });
  }),
  getAllByColor: publicProcedure
    .input(z.object({ wineColorId: z.number() }))
    .query(({ ctx, input }) => {
      if (!ctx.session?.user.id) {
        throw new Error("User must be logged in to view wine records");
      }
      return ctx.prisma.wine.findMany({
        where: {
          ownerId: ctx.session?.user.id,
          wineColorId: input.wineColorId,
        },
        include: {
          wineColor: true,
          wineBottles: true,
          tastingNotes: true,
        },
      });
    }),
  getAllByBottleFormat: publicProcedure
    .input(z.object({ formatId: z.number() }))
    .query(({ ctx, input }) => {
      if (!ctx.session?.user.id) {
        throw new Error("User must be logged in to view wine records");
      }
      return ctx.prisma.wine.findMany({
        where: {
          ownerId: ctx.session?.user.id,
          wineBottles: {
            some: {
              formatId: input.formatId,
            },
          },
        },
        include: {
          wineColor: true,
          wineBottles: {
            where: {
              formatId: input.formatId,
            },
            include: {
              format: {
                select: {
                  name: true,
                  capacity: true,
                },
              },
            },
          },
          tastingNotes: true,
        },
      });
    }),
  getOne: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      if (!ctx.session?.user.id) {
        throw new Error("User must be logged in to view wine records");
      }
      return ctx.prisma.wine.findFirst({
        where: {
          ownerId: ctx.session?.user.id,
          id: input.id,
        },
        include: {
          wineColor: true,
          wineBottles: {
            include: {
              format: {
                select: {
                  name: true,
                  capacity: true,
                },
              },
            },
          },
          tastingNotes: true,
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        producer: z.string(),
        varietal: z.array(z.string()).optional(),
        country: z.string(),
        region: z.string(),
        vintage: z.number(),
        purchasedAt: z.date(),
        description: z.string(),
        image: z.string(),
        servingTemperature: z.string(),
        ownerId: z.string(),
        wineColorId: z.number(),
        wineBottles: z.array(
          z.object({
            quantity: z.number(),
            price: z.number(),
            format: z.object({
              id: z.number(),
            }),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user.id) {
        throw new Error("User must be logged in to create a wine record");
      }

      const { wineBottles, ...wineData } = input;

      const wine = await ctx.prisma.wine.create({
        data: {
          ...wineData,
          ownerId: input.ownerId,
          wineColorId: input.wineColorId,
          wineBottles: {
            create: wineBottles.map((f) => ({
              quantity: f.quantity,
              price: f.price,
              format: {
                connect: { id: f.format.id },
              },
            })),
          },
        },
      });

      return wine;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        producer: z.string(),
        varietal: z.array(z.string()),
        country: z.string(),
        region: z.string(),
        vintage: z.number(),
        purchasedAt: z.date(),
        consumedAt: z.date(),
        description: z.string(),
        image: z.string(),
        servingTemperature: z.string(),
        wineColorId: z.number(),
        ownerId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user.id) {
        throw new Error("User must be logged in to update a wine record");
      }
      const wine = await ctx.prisma.wine.findUnique({
        where: {
          id: input.id,
        },
        include: {
          wineColor: true,
          wineBottles: true,
          tastingNotes: true,
        },
      });

      if (!wine) {
        throw new Error(`Invalid wine id: ${input.id}`);
      }
      if (wine.ownerId !== ctx.session.user.id) {
        throw new Error("User is not authorized to update this wine record");
      }

      return ctx.prisma.wine.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          producer: input.producer,
          varietal: input.varietal,
          country: input.country,
          region: input.region,
          vintage: input.vintage,
          purchasedAt: input.purchasedAt,
          consumedAt: input.consumedAt,
          description: input.description,
          image: input.image,
          servingTemperature: input.servingTemperature,
          ownerId: input.ownerId,
          wineColorId: input.wineColorId,
        },
      });
    }),

  updateImage: publicProcedure
    .input(
      z.object({
        id: z.number(),
        image: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user.id) {
        throw new Error("User must be logged in to update a wine record");
      }
      const wine = await ctx.prisma.wine.findUnique({
        where: {
          id: input.id,
        },
        include: {
          wineColor: true,
          wineBottles: true,
          tastingNotes: true,
        },
      });

      if (!wine) {
        throw new Error(`Invalid wine id: ${input.id}`);
      }
      if (wine.ownerId !== ctx.session.user.id) {
        throw new Error("User is not authorized to update this wine record");
      }

      return ctx.prisma.wine.update({
        where: {
          id: input.id,
        },
        data: {
          image: input.image,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user.id) {
        throw new Error("User must be logged in to delete a wine record");
      }
      const wine = await ctx.prisma.wine.findUnique({
        where: {
          id: input.id,
        },
      });

      if (wine?.ownerId !== ctx.session.user.id) {
        throw new Error("User is not authorized to delete this wine record");
      }

      return ctx.prisma.wine.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
