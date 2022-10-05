import { manageRouter } from './manage';
// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { protectedRouter } from "./protected-router";
import { restaurantRouter } from "./restaurant";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", protectedRouter)
  .merge("restaurant.", restaurantRouter)
  .merge("manage.",manageRouter)

// export type definition of API
export type AppRouter = typeof appRouter;
