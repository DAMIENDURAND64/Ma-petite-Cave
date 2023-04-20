import { createTRPCRouter } from "~/server/api/trpc";
import { grapesRouter } from "./routers/grapes";
import { wineRouter } from "./routers/wine";
import { colorRouter } from "./routers/color";

export const appRouter = createTRPCRouter({
  grapes: grapesRouter,
  wines: wineRouter,
  color: colorRouter,
});

export type AppRouter = typeof appRouter;
