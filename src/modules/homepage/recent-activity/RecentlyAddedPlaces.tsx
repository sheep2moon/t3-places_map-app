import { Place } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { getPlaceImageSrc } from "../../../utils/getImageSrc";
import { trpc } from "../../../utils/trpc";
import { usePlacesMapStore } from "../../../zustand/placesMapStore";
import PlaceTypeBadge from "../../common/badges/PlaceTypeBadge";
import Button from "../../common/Button";
import HorizontalLine from "../../common/HorizontalLine";
import LoadingSpinner from "../../common/LoadingSpinner";
import ImageSkeleton from "../../common/skeletons/ImageSkeleton";

const RecentlyAddedPlaces = () => {
    const { data, isLoading } = trpc.useQuery(["places.getRecentlyAddedPlaces"]);
    const { setCurrentPlaceId, setIsPlaceModalOpen, setFlyTo } = usePlacesMapStore(state => state);
    const router = useRouter();

    const handleViewPlace = (place: Place) => {
        setCurrentPlaceId(place.id);
        setIsPlaceModalOpen(true);
        setFlyTo({ lat: place.lat, lng: place.lng });
        router.push("/places-map");
    };

    return (
        <div className="mt-8 flex flex-col">
            <HorizontalLine>
                <h2 className="text-lg font-bold md:text-xl lg:text-2xl">Ostatnio dodane miejsca</h2>
            </HorizontalLine>
            {isLoading && <LoadingSkeleton />}
            <div className="mt-4 grid h-full w-full gap-2 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {data?.map(place => (
                    <div key={place.id} className="relative h-full min-h-[12rem] w-full min-w-[220px] max-w-md rounded-md text-light shadow-md shadow-black/30 dark:shadow-black/60">
                        {place.images[0] && <Image className="rounded-md object-cover" alt="" src={getPlaceImageSrc(place.images[0].id)} layout="fill" />}
                        <div className="absolute inset-0 z-10 flex w-full flex-col justify-between rounded-md bg-black/60 p-2 ">
                            <p className="text-center text-lg">{place.displayName}</p>
                            <div className="flex items-center justify-between">
                                <PlaceTypeBadge placeType={place.type} size="sm" />
                                <Button onClick={() => handleViewPlace(place)} variant="outline" className="text-base">
                                    Zobacz
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentlyAddedPlaces;

const LoadingSkeleton = () => {
    return (
        <div className="mt-4 grid h-48 w-full flex-wrap gap-2 overflow-hidden px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="h-48 w-full min-w-[220px] max-w-md">
                <ImageSkeleton />
            </div>
            <div className="h-48 w-full min-w-[220px] max-w-md">
                <ImageSkeleton />
            </div>
            <div className="h-48 w-full min-w-[220px] max-w-md">
                <ImageSkeleton />
            </div>
            <div className="h-48 w-full min-w-[220px] max-w-md">
                <ImageSkeleton />
            </div>
        </div>
    );
};
