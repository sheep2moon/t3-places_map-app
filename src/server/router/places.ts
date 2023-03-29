import { z } from "zod";
import { createRouter } from "./context";

export const placesRouter = createRouter()
  .query("getPlaceTypes", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.placeType.findMany();
    },
  })
  .query("getPlaces", {
    input: z.object({
      placeTypeId: z.string().optional(),
    }),
    resolve: async ({ input, ctx }) => {
      if (input.placeTypeId)
        return await ctx.prisma.place.findMany({
          where: { placeTypeId: input.placeTypeId },
          include: { type: true, images: true },
        });
      else
        return await ctx.prisma.place.findMany({
          include: { type: true, images: true },
        });
    },
  })
  .query("getFilteredPlaces", {
    input: z.object({
      query: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      if (input.query.length > 2) {
        return await ctx.prisma.place.findMany({
          where: {
            displayName: { contains: input.query },
          },
          include: {
            type: true,
            images: true,
            reviews: true,
          },
        });
      }
      return null;
    },
  })
  .query("getPlaceDetails", {
    input: z.object({
      placeId: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      return await ctx.prisma.place.findUnique({
        where: { id: input.placeId },
        include: { images: true, type: true, addedBy: true, reviews: true },
      });
    },
  })
  .query("getPlaceReviews", {
    input: z.object({
      placeId: z.string(),
    }),
    resolve: async ({ input, ctx }) => {
      return await ctx.prisma.review.findMany({
        where: { placeId: input.placeId },
        include: { user: true },
      });
    },
  })
  .query("getRecentlyAddedPlaces", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.place.findMany({
        take: 3,
        include: {
          type: true,
          images: true,
        },
        orderBy: [{ createdAt: "desc" }],
        where: {
          NOT: { images: { none: { id: undefined } } },
        },
      });
    },
  })
  .query("getRecentlyAddedReviews", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.review.findMany({
        take: 3,
        include: {
          user: true,
          Place: { include: { images: true, type: true } },
        },
        orderBy: [{ createdAt: "desc" }],
      });
    },
  });
