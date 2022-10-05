import { z } from "zod";
import { createProtectedRouter } from './context';


export const manageRouter = createProtectedRouter()
.query("getCategories",{
    resolve: async ({ctx}) => {
        if(ctx.session.user.restaurantId){
            return await ctx.prisma.category.findMany({where:{restaurantId: ctx.session.user.restaurantId}})
        }
    }
})
.mutation("createCategory",{
    input: z.object({
        name: z.string(),
        color: z.string(),
    }),
    resolve: async ({input,ctx}) => {
        if(ctx.session.user.restaurantId){
            await ctx.prisma.category.create({
            data: {
                name: input.name,
                color: input.color,
                restaurantId: ctx.session.user.restaurantId
            }})
        }
    }
})