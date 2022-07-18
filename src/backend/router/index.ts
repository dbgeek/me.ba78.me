import superjson from "superjson";
import { createRouter } from "./context";
import { healthRouter } from "./health";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("health.", healthRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
