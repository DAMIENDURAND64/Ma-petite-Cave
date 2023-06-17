import { createTRPCRouter } from "~/server/api/trpc";
import { wineRouter } from "./routers/wine";
import { colorRouter } from "./routers/color";
import { userRouter } from "./routers/user";
import { bottleFormat } from "./routers/bottleFormat";
import { vintageRouter } from "./routers/vintage";

export const appRouter = createTRPCRouter({
  wines: wineRouter,
  color: colorRouter,
  user: userRouter,
  bottleFormat: bottleFormat,
  vintage: vintageRouter,
});

export type AppRouter = typeof appRouter;
