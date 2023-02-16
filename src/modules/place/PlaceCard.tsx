import { Image as ImageType, Place, PlaceType } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { getPlaceImageSrc } from "../../utils/getImageSrc";
import { usePlacesMapStore } from "../../zustand/placesMapStore";
import PlaceTypeIcon from "./PlaceTypeIcon";

type PlaceCardProps = {
    place: Place & { type: PlaceType; images: ImageType[] };
};

const PlaceCard = ({ place }: PlaceCardProps) => {
    const { setCurrentPlaceId, setIsPlaceModalOpen, setFlyTo } = usePlacesMapStore(state => state);
    const router = useRouter();

    const handleGoToPlace = (place: Place) => {
        setCurrentPlaceId(place.id);
        setIsPlaceModalOpen(true);
        setFlyTo({ lat: place.lat, lng: place.lng });
        router.push("/places-map");
    };

    return (
        <div className="relative h-52 w-80">
            <div className="relative z-10 h-40 w-[300px]  ">{place.images[0] && <Image className="rounded-md object-cover shadow-sm dark:shadow-secondary/20" alt="" src={getPlaceImageSrc(place.images[0].id)} fill />}</div>
            <div className="absolute top-4 left-0 flex h-48 w-full">
                <div className="w-4"></div>
                <div className="flex h-full w-full flex-col justify-end rounded-md bg-indigo-700/20 shadow-sm dark:shadow-indigo-800">
                    <div className="relative flex h-12 p-1">
                        <PlaceTypeIcon className="absolute -left-4" placeType={place.type} size="sm" />
                        <div className="flex flex-col">
                            <span className="text-secondary line-clamp-1">{place.displayName}</span>
                            <span className="text-xs text-secondary">{place.type.title}</span>
                        </div>
                        <button onClick={() => handleGoToPlace(place)} className="my-auto ml-auto mr-2 h-fit rounded-lg bg-indigo-900">
                            <BsArrowRightSquareFill className="text-3xl dark:text-indigo-200" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceCard;
