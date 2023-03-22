import { s3 } from "./images";
import { z } from "zod";
import { createProtectedRouter } from "./context";
import { env } from "../../env/server.mjs";

export const protectedPlacesRouter = createProtectedRouter()
  .mutation("createPlace", {
    input: z.object({
      displayName: z.string(),
      description: z.string(),
      placeTypeId: z.string(),
      lat: z.number(),
      lng: z.number(),
      isPaid: z.boolean(),
      prices: z.string(),
    }),
    async resolve({ input, ctx }) {
      const res = await ctx.prisma.place.create({
        data: {
          ...input,
          addedById: ctx.session.user.id,
        },
      });
      return res;
    },
  })
  .mutation("updateReview", {
    input: z.object({
      reviewId: z.string(),
      comment: z.string(),
      rate: z.number().min(0).max(5),
    }),
    async resolve({ input, ctx }) {
      await ctx.prisma.review.update({
        where: { id: input.reviewId },
        data: {
          comment: input.comment,
          rate: input.rate,
        },
      });
    },
  })
  .mutation("deleteReview", {
    input: z.object({
      reviewId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const review = await ctx.prisma.review.findFirst({
        where: { id: input.reviewId },
      });
      if (review?.createdBy === ctx.session.user.id) {
        await ctx.prisma.review.delete({ where: { id: input.reviewId } });
      }
    },
  })
  .query("getUserPlaces", {
    async resolve({ ctx }) {
      const res = await ctx.prisma.place.findMany({
        where: {
          addedById: ctx.session.user.id,
        },
        include: {
          type: true,
        },
      });
      return res;
    },
  })
  .query("getPlaceImages", {
    input: z.object({
      placeId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const res = await ctx.prisma.image.findMany({
        where: {
          placeId: input.placeId,
        },
      });
      return res;
    },
  })
  .query("getUserPlace", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      const res = await ctx.prisma.place.findUnique({
        where: {
          id: input.id,
        },
        include: {
          type: true,
          images: true,
        },
      });
      return res;
    },
  })
  .mutation("deletePlace", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      const images = await ctx.prisma.image.findMany({
        where: { placeId: input.id },
      });
      const keys = images.map((image) => ({ Key: `placeImages/${image.id}` }));
      console.log(keys);

      await s3
        .deleteObjects({
          Bucket: env.S3_BUCKET_NAME,
          Delete: {
            Objects: keys,
          },
        })
        .promise();
      await ctx.prisma.place.delete({ where: { id: input.id } });
    },
  })
  .mutation("updateName", {
    input: z.object({
      placeId: z.string(),
      displayName: z.string(),
    }),
    async resolve({ input, ctx }) {
      await ctx.prisma.place.update({
        where: { id: input.placeId },
        data: { displayName: input.displayName },
      });
    },
  })

  .mutation("addReview", {
    input: z.object({
      placeId: z.string(),
      comment: z.string(),
      rate: z.number().min(0).max(5),
    }),
    async resolve({ input, ctx }) {
      await ctx.prisma.review.create({
        data: {
          createdBy: ctx.session.user.id,
          comment: input.comment,
          rate: input.rate,
          placeId: input.placeId,
        },
      });
      const placeAddedBy = await ctx.prisma.place.findFirst({
        where: { id: input.placeId },
      });
      if (placeAddedBy?.addedById) {
        await ctx.prisma.notification.create({
          data: {
            type: "REVIEW",
            message: input.comment,
            userId: placeAddedBy?.addedById,
          },
        });
      }
    },
  })
  .mutation("updatePosition", {
    input: z.object({
      placeId: z.string(),
      lat: z.number(),
      lng: z.number(),
    }),
    async resolve({ input, ctx }) {
      await ctx.prisma.place.update({
        where: { id: input.placeId },
        data: { lat: input.lat, lng: input.lng },
      });
    },
  })
  .mutation("updateDescription", {
    input: z.object({
      placeId: z.string(),
      description: z.string(),
    }),
    async resolve({ input, ctx }) {
      await ctx.prisma.place.update({
        where: { id: input.placeId },
        data: { description: input.description },
      });
    },
  })
  .mutation("updatePlaceType", {
    input: z.object({
      placeId: z.string(),
      placeTypeId: z.string(),
    }),
    async resolve({ input, ctx }) {
      await ctx.prisma.place.update({
        where: { id: input.placeId },
        data: { placeTypeId: input.placeTypeId },
      });
    },
  })
  .mutation("updatePlacePrices", {
    input: z.object({
      isPaid: z.boolean(),
      placeId: z.string(),
      prices: z.string(),
    }),
    async resolve({ input, ctx }) {
      await ctx.prisma.place.update({
        where: { id: input.placeId },
        data: {
          isPaid: input.isPaid,
          prices: input.prices,
        },
      });
    },
  });
