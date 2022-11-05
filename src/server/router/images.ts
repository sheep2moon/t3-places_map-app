import { S3 } from "aws-sdk";
import { PresignedPost } from "aws-sdk/clients/s3.js";
import { z } from "zod";
import { env } from "../../env/server.mjs";
import { createProtectedRouter } from "./context";

const s3 = new S3({
    apiVersion: "2006-03-01",
    accessKeyId: env.ACCESS_KEY,
    secretAccessKey: env.SECRET_KEY,
    region: env.REGION,
    signatureVersion: "v4"
});

export const imagesRouter = createProtectedRouter()
    .mutation("createPresignedUrl", {
        input: z.object({
            placeId: z.string()
        }),
        async resolve({ input, ctx }) {
            const image = await ctx.prisma.image.create({
                data: {
                    placeId: input.placeId
                }
            });
            const s3Data: PresignedPost = await new Promise((resolve, reject) => {
                s3.createPresignedPost(
                    {
                        Fields: {
                            key: `placeImages/${image.id}`
                        },
                        Conditions: [
                            ["starts-with", "$Content-Type", "image/"],
                            ["content-length-range", 0, 1000000]
                        ],
                        Expires: 60,
                        Bucket: env.BUCKET_NAME
                    },
                    (err, signed) => {
                        if (err) return reject(err);
                        resolve(signed);
                    }
                );
            });
            return { url: s3Data.url, fields: s3Data.fields, imageId: image.id };
        }
    })
    .mutation("deleteImage", {
        input: z.object({
            imageId: z.string()
        }),
        async resolve({ input, ctx }) {
            await ctx.prisma.image.delete({
                where: {
                    id: input.imageId
                }
            });
            const res = await s3
                .deleteObject({ Bucket: env.BUCKET_NAME, Key: `placeImages/${input.imageId}` }, (err, data) => {
                    console.log("err", err);
                    console.log("data", data);
                })
                .promise();
            console.log(res);
        }
    });
