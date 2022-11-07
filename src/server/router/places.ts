import { z } from "zod";
import { createProtectedRouter } from "./context";

export const placesRouter = createProtectedRouter()
    .query("getPlaceTypes", {
        resolve: async ({ ctx }) => {
            return await ctx.prisma.placeType.findMany();
        }
    })
    .query("getPlaces", {
        input: z.object({
            placeTypeId: z.string().optional()
        }),
        resolve: async ({ input, ctx }) => {
            if (input.placeTypeId) return await ctx.prisma.place.findMany({ where: { placeTypeId: input.placeTypeId }, include: { type: true, images: true } });
            else return await ctx.prisma.place.findMany({ include: { type: true, images: true } });
        }
    })
    .query("getPlaceDetails", {
        input: z.object({
            placeId: z.string()
        }),
        resolve: async ({ input, ctx }) => {
            return await ctx.prisma.place.findUnique({ where: { id: input.placeId }, include: { images: true, type: true, reviews: true } });
        }
    });
