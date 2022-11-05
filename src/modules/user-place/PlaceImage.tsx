import { Image as ImageType } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import { getPlaceImageSrc } from "../../utils/getImageSrcById";
import { trpc } from "../../utils/trpc";
import LoadingSpinner from "../common/LoadingSpinner";
import { RiDeleteBin5Line } from "react-icons/ri";

type PlaceImageProps = {
    image: ImageType;
    refetch: () => void;
};

const PlaceImage = ({ image, refetch }: PlaceImageProps) => {
    const { mutateAsync: deleteImage } = trpc.useMutation(["images.deleteImage"]);
    const [showDelete, setShowDelete] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (imageId: string) => {
        setIsDeleting(true);
        await deleteImage({ imageId });
        refetch();
    };

    return (
        <div className="">
            <div className="relative aspect-square w-full">
                <Image src={getPlaceImageSrc(image.id)} alt="wygląd miejsca" layout="fill" className="rounded-md" onClick={() => setShowDelete(prev => !prev)} />

                <button onClick={() => handleDelete(image.id)} className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full border border-secondary bg-white/80 text-zinc-900 ">
                    <RiDeleteBin5Line />
                </button>

                {isDeleting && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60">
                        <LoadingSpinner />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlaceImage;
