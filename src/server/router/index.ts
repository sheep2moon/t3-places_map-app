import { userRouter } from "./user";
import { createRouter } from "./context";
import superjson from "superjson";
import { placesRouter } from "./places";
import { imagesRouter } from "./images";
import { protectedPlacesRouter } from "./protectedPlace";

export const appRouter = createRouter().transformer(superjson).merge("places.", placesRouter).merge("images.", imagesRouter).merge("protectedPlace.", protectedPlacesRouter).merge("user.", userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
