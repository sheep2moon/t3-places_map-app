import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { getImageSrcById } from "../../utils/getImageSrcById";
import { trpc } from "../../utils/trpc";
import Button from "../common/Button";
import ImageInput from "./ImagesInput";
import LabelBar, { LabelBarProps } from "./LabelBar";
import PlaceImage from "./PlaceImage";

// type EditImagesProps = {
//     placeId: string;
// };

const EditImages = () => {
    const { query } = useRouter();
    const id = query.id as string;
    const placeImages = trpc.useQuery(["protectedPlace.getPlaceImages", { placeId: id }]);

    return (
        <div className="flex flex-col gap-1">
            <LabelBar label="Zdjęcia" />
            <div className="grid grid-cols-4 gap-2">
                <ImageInput placeId={id} refetch={placeImages.refetch} />
                {placeImages.data?.map(img => (
                    <PlaceImage refetch={placeImages.refetch} key={img.id} image={img} />
                ))}
            </div>
        </div>
    );
};

export default EditImages;
