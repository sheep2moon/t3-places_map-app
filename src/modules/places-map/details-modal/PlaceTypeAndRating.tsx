import { PlaceType, Review } from "@prisma/client";
import React from "react";
import { getAverageRating } from "../../../utils/getAverageRating";
import PlaceTypeBadge from "../../common/badges/PlaceTypeBadge";
import { IoStar } from "react-icons/io5";

type PlaceTypeAndRatingProps = {
    placeType: PlaceType;
    placeReviews: Review[];
};

const PlaceTypeAndRating = ({ placeType, placeReviews }: PlaceTypeAndRatingProps) => {
    return (
        <div className="flex w-full items-center justify-between">
            <PlaceTypeBadge size="sm" placeType={placeType} />
            <div className="flex items-center">
                {getAverageRating(placeReviews) !== 0 && (
                    <div className="flex items-center">
                        <IoStar className="text-amber-400" />
                        <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">{getAverageRating(placeReviews)}</p>
                        <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400"></span>
                    </div>
                )}
                <span className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">{placeReviews.length !== 0 ? placeReviews.length : "brak"} recenzji</span>
            </div>
            {/* <div className="flex items-center gap-1 text-lg font-bold"></div> */}
        </div>
    );
};

export default PlaceTypeAndRating;
