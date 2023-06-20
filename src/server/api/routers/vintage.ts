import { createTRPCRouter, publicProcedure } from "../trpc";

export const vintageRouter = createTRPCRouter({
  getAllByUser: publicProcedure.query(({ ctx }) => {
    if (!ctx.session?.user.id) {
      throw new Error("User must be logged in to view vintage records");
    }
    const wines = ctx.prisma.wine.findMany({
      where: {
        ownerId: ctx.session?.user.id,
      },
      select: {
        vintage: true,
      },
    });
    return wines;
  }),
});
