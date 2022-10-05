import { unstable_getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { createProtectedRouter } from './context';


export const restaurantRouter = createProtectedRouter()
.query("getRestaurant",{
    async resolve({ctx}){
        return ctx.prisma.restaurant.findFirst({
            where: {
                ownerId: ctx.session.user.id
            }})
    }
})
.mutation("createRestaurant",{input: z.object({
    name: z.string()
}),
async resolve({input,ctx}){
    await ctx.prisma.restaurant.create({
        data:{
            name: input.name,
            ownerId: ctx.session.user.id
        }})
}})


