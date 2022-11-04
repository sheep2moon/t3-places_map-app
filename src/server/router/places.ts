import { z } from "zod";
import { createProtectedRouter } from "./context";

export const placesRouter = createProtectedRouter().query("getPlaceTypes", {
    resolve: async ({ ctx }) => {
        if (ctx.session.user.restaurantId) {
            return await ctx.prisma.placeType.findMany();
        }
    }
});
