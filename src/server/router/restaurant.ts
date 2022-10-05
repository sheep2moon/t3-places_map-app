import { unstable_getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { createProtectedRouter } from './context';


export const restaurantRouter = createProtectedRouter()
.query("getRestaurant",{
    async resolve({ctx}){
        return ctx.prisma.restaurant.findFirst({
            where: {
                id: ctx.session.user.restaurantId
            }})
    }
})
.mutation("createRestaurant",{input: z.object({
    name: z.string()
}),
async resolve({input,ctx}){
    const res = await ctx.prisma.restaurant.create({
        data:{
            name: input.name,
            ownerId: ctx.session.user.id
        }})
    await ctx.prisma.user.update({
        where:{
            id: ctx.session.user.id
        },
        data: {
            restaurantId: res.id
        }
    })
}})


