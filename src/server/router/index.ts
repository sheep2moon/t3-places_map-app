import { manageRouter } from "./manage";
// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { restaurantRouter } from "./restaurant";
import { placesRouter } from "./places";
import { imagesRouter } from "./images";

export const appRouter = createRouter().transformer(superjson).merge("places.", placesRouter).merge("images.", imagesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
