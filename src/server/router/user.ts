import { z } from "zod";
import { env } from "../../env/server.mjs";
import { createProtectedRouter } from "./context";

export const userRouter = createProtectedRouter()
  .query("getUserDetails", {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findFirst({
        where: {
          id: ctx.session.user.id,
        },
        include: {
          reviews: true,
        },
      });
    },
  })
  .query("getUserReviewByPlaceId", {
    input: z.object({
      placeId: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await prisma?.review.findFirst({
        where: {
          placeId: input.placeId,
          createdBy: ctx.session.user.id,
        },
      });
    },
  })
  .query("getUserLibrary", {
    async resolve({ ctx }) {
      return await prisma?.userLibrary.upsert({
        where: { userId: ctx.session.user.id },
        update: {},
        create: { userId: ctx.session.user.id },
        include: {
          wishlist: { include: { type: true } },
          visited: { include: { type: true } },
        },
      });
    },
  })
  .query("getUserProfileData", {
    async resolve({ ctx }) {
      return await prisma?.user.findFirst({
        where: { id: ctx.session.user.id },
        include: {
          UserLibrary: {
            include: {
              visited: { include: { type: true } },
              wishlist: { include: { type: true } },
            },
          },
          places: { include: { type: true } },
          reviews: true,
        },
      });
    },
  })
  .mutation("toggleWishlistPlace", {
    input: z.object({
      placeId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const isWishlisted = await ctx.prisma.userLibrary.findFirst({
        where: {
          userId: ctx.session.user.id,
          wishlist: { some: { id: input.placeId } },
        },
      });
      if (isWishlisted) {
        await ctx.prisma.userLibrary.update({
          where: { userId: ctx.session.user.id },
          data: {
            wishlist: {
              disconnect: { id: input.placeId },
            },
          },
        });
      } else {
        await ctx.prisma.userLibrary.update({
          where: { userId: ctx.session.user.id },
          data: {
            wishlist: {
              connect: { id: input.placeId },
            },
          },
        });
      }
    },
  })
  .mutation("toggleVisitedPlace", {
    input: z.object({
      placeId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const isVisited = await ctx.prisma.userLibrary.findFirst({
        where: {
          userId: ctx.session.user.id,
          visited: { some: { id: input.placeId } },
        },
      });
      if (isVisited) {
        await ctx.prisma.userLibrary.update({
          where: { userId: ctx.session.user.id },
          data: {
            visited: {
              disconnect: { id: input.placeId },
            },
          },
        });
      } else {
        await ctx.prisma.userLibrary.update({
          where: { userId: ctx.session.user.id },
          data: {
            visited: {
              connect: { id: input.placeId },
            },
          },
        });
      }
    },
  });
