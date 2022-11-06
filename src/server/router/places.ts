import { createProtectedRouter } from "./context";

export const placesRouter = createProtectedRouter()
    .query("getPlaceTypes", {
        resolve: async ({ ctx }) => {
            return await ctx.prisma.placeType.findMany();
        }
    })
    .query("getPlaces", {
        resolve: async ({ ctx }) => {
            return await ctx.prisma.place.findMany({ include: { type: true, images: true } });
        }
    });
