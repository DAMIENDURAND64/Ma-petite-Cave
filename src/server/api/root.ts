import { createTRPCRouter } from "~/server/api/trpc";
import { wineRouter } from "./routers/wine";
import { colorRouter } from "./routers/color";
import { userRouter } from "./routers/user";

export const appRouter = createTRPCRouter({
  wines: wineRouter,
  color: colorRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
