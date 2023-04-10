import { createTRPCRouter } from "~/server/api/trpc";
import { grapesRouter } from "./routers/grapes";
import { wineRouter } from "./routers/wine";

export const appRouter = createTRPCRouter({
  grapes: grapesRouter,
  wines: wineRouter,
});

export type AppRouter = typeof appRouter;
