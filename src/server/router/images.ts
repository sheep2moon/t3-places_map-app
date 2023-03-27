import { Image } from "@prisma/client";
import { S3 } from "aws-sdk";
import { PresignedPost } from "aws-sdk/clients/s3.js";
import { z } from "zod";
import { env } from "../../env/server.mjs";
import { createProtectedRouter } from "./context";

export const s3 = new S3({
    apiVersion: "2006-03-01",
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
    region: env.S3_REGION,
    signatureVersion: "v4"
});

export const imagesRouter = createProtectedRouter()
    .mutation("createPresignedUrl", {
        input: z.object({
            placeId: z.string()
        }),
        async resolve({ input, ctx }) {
            const image: Image = await ctx.prisma.image.create({
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
                            ["content-length-range", 0, 5000000]
                        ],
                        Expires: 60,
                        Bucket: env.S3_BUCKET_NAME
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
                .deleteObject({ Bucket: env.S3_BUCKET_NAME, Key: `placeImages/${input.imageId}` }, (err, data) => {
                    console.log("err", err);
                    console.log("data", data);
                })
                .promise();
            console.log(res);
        }
    })
    .mutation("deleteManyImages", {
        input: z.object({
            imagesId: z.array(z.string())
        }),
        async resolve({ input }) {
            const keys = input.imagesId.map(id => ({ Key: `placeImages/${id}` }));
            s3.deleteObjects({
                Bucket: env.S3_BUCKET_NAME,
                Delete: {
                    Objects: keys
                }
            });
        }
    });
