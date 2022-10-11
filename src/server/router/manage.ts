import { z } from "zod";
import { createProtectedRouter } from "./context";

export const manageRouter = createProtectedRouter()
    .query("getCategories", {
        resolve: async ({ ctx }) => {
            if (ctx.session.user.restaurantId) {
                return await ctx.prisma.category.findMany({ where: { restaurantId: ctx.session.user.restaurantId } });
            }
        }
    })
    .mutation("createCategory", {
        input: z.object({
            name: z.string(),
            color: z.string()
        }),
        resolve: async ({ input, ctx }) => {
            if (ctx.session.user.restaurantId) {
                await ctx.prisma.category.create({
                    data: {
                        name: input.name,
                        color: input.color,
                        restaurantId: ctx.session.user.restaurantId
                    }
                });
            }
        }
    })
    .mutation("updateCategory", {
        input: z.object({
            name: z.string(),
            color: z.string(),
            id: z.string()
        }),
        resolve: async ({ input, ctx }) => {
            if (ctx.session.user.restaurantId) {
                await ctx.prisma.category.update({
                    where: {
                        id: input.id
                    },
                    data: {
                        name: input.name,
                        color: input.color,
                        restaurantId: ctx.session.user.restaurantId
                    }
                });
            }
        }
    })
    .mutation("deleteCategory", {
        input: z.object({
            id: z.string()
        }),
        resolve: async ({ input, ctx }) => {
            if (ctx.session.user.restaurantId) {
                await ctx.prisma.category.delete({
                    where: {
                        id: input.id
                    }
                });
            }
        }
    })
    .mutation("createProduct", {
        input: z.object({
            name: z.string(),
            price: z.number(),
            categoryId: z.string()
        }),
        resolve: async ({ input, ctx }) => {
            if (ctx.session.user.restaurantId) {
                await ctx.prisma.product.create({
                    data: {
                        name: input.name,
                        price: input.price,
                        categoryId: input.categoryId
                    }
                });
            }
        }
    });
