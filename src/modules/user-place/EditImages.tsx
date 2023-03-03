import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../../utils/trpc";
import ImageInput from "./ImagesInput";
import LabelBar from "./LabelBar";
import PlaceImage from "./PlaceImage";

const EditImages = () => {
    const { query } = useRouter();
    const id = query.id as string;
    const placeImages = trpc.useQuery(["protectedPlace.getPlaceImages", { placeId: id }]);

    return (
        <div className="flex flex-col gap-1">
            <LabelBar label="Zdjęcia" />
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                <ImageInput placeId={id} refetch={placeImages.refetch} />
                {placeImages.data?.map(img => (
                    <PlaceImage refetch={placeImages.refetch} key={img.id} image={img} />
                ))}
            </div>
        </div>
    );
};

export default EditImages;
