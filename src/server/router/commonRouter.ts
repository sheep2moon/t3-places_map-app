import { z } from "zod";
import { createRouter } from "./context";

export const commonRouter = createRouter().mutation("sendReport", {
  input: z.object({
    title: z.string(),
    content: z.string(),
    userId: z.string().optional(),
  }),
  async resolve({ input, ctx }) {
    return await ctx.prisma.report.create({
      data: {
        createdBy: input.userId ? input.userId : "anonymous",
        content: input.content,
        title: input.title,
      },
    });
  },
});
