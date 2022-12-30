import { Image as ImageType, Place, PlaceType } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { UseQueryResult } from "react-query";
import { getPlaceImageSrc } from "../../../utils/getImageSrc";
import PlaceTypeBadge from "../../common/badges/PlaceTypeBadge";
import Button from "../../common/Button";
import LoadingSpinner from "../../common/LoadingSpinner";

type RecentlyAddedPlacesProps = {
    queryResult: UseQueryResult<(Place & { images: ImageType[]; type: PlaceType })[]>;
};

const RecentlyAddedPlaces = ({ queryResult }: RecentlyAddedPlacesProps) => {
    if (queryResult.isLoading) return <LoadingSpinner />;

    return (
        <div className="flex h-full w-full justify-evenly ">
            {queryResult.data?.map(place => (
                <div key={place.id} className="flex h-full w-full max-w-sm p-2 dark:bg-black/10">
                    {place.images[0] && (
                        <div className="relative aspect-square h-44 ">
                            <Image alt="" src={getPlaceImageSrc(place.images[0].id)} layout="fill" />
                        </div>
                    )}
                    <div className="flex w-full flex-col justify-between p-2">
                        <p>{place.displayName}</p>
                        <div className="flex flex-col">
                            <PlaceTypeBadge placeType={place.type} size="sm" />
                            <Button variant="alternative" className="w-full">
                                Zobacz
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecentlyAddedPlaces;
