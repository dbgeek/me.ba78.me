import superjson from "superjson";
import { createRouter } from "./context";

export const appRouter = createRouter()
  .transformer(superjson)

// export type definition of API
export type AppRouter = typeof appRouter;
