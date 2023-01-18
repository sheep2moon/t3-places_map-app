import { Image as ImageType } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { getPlaceImageSrc } from "../../../utils/getImageSrc";
import { useEnlargedImageStore } from "../../../zustand/enlargedImageStore";

type ImageGalleryProps = {
    images: ImageType[];
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
    const { setCurrentImageId, open } = useEnlargedImageStore();

    const handleEnlargeImage = (imageId: string) => {
        setCurrentImageId(imageId);
        open();
    };

    if (images.length === 0) return null;
    return (
        <div className="flex flex-col">
            <div className="my-1 grid grid-cols-3 grid-rows-1 gap-1 xsmall:grid-cols-4 small:grid-cols-5">
                {images.slice(0, 4).map(image => (
                    <div className="relative aspect-square" key={image.id} onClick={() => handleEnlargeImage(image.id)}>
                        <Image src={getPlaceImageSrc(image.id)} alt="widok z miejsca" className="rounded-sm" layout="fill" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
