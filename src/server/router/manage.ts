import { z } from "zod";
import { createProtectedRouter, createRouter } from './context';


export const manageRouter = createProtectedRouter()
.mutation("createCategory",{
    input: z.object({
        name: z.string(),
        color: z.string()
    }),
    resolve: async ({input,ctx}) => {
        await ctx.prisma.category.create({
        data: {
            name: input.name,
            color: input.color,
            restaurantId: "22" //TODO
        }})
    }
})