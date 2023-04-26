import { createTRPCRouter } from "~/server/api/trpc";
import { grapesRouter } from "./routers/grapes";
import { wineRouter } from "./routers/wine";
import { colorRouter } from "./routers/color";
import { userRouter } from "./routers/user";

export const appRouter = createTRPCRouter({
  grapes: grapesRouter,
  wines: wineRouter,
  color: colorRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
