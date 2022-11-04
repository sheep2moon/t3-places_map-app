import { z } from "zod";
import { createProtectedRouter } from "./context";

export const protectedPlacesRouter = createProtectedRouter()
    .mutation("createPlace", {
        input: z.object({
            displayName: z.string(),
            description: z.string(),
            placeTypeId: z.string(),
            lat: z.number(),
            lng: z.number()
        }),
        async resolve({ input, ctx }) {
            const res = await ctx.prisma.place.create({
                data: {
                    ...input
                }
            });
            return res;
        }
    })
    .query("getUserPlace", {
        input: z.object({
            id: z.string()
        }),
        async resolve({ input, ctx }) {
            const res = await ctx.prisma.place.findUnique({
                where: {
                    id: input.id
                },
                include: {
                    type: true
                }
            });
            return res;
        }
    })
    .mutation("deletePlace", {
        input: z.object({
            id: z.string()
        }),
        async resolve({ input, ctx }) {
            await ctx.prisma.place.delete({ where: { id: input.id } });
        }
    });
