import { Review } from "@prisma/client";
import React from "react";
import { HiStar } from "react-icons/hi";
import { getAverageRating } from "../../../utils/getAverageRating";

const RatingBadge = ({ reviews }: { reviews: Review[] }) => {
    return (
        <div className="flex items-center gap-1">
            <HiStar className="text-lg text-amber-400" />
            <span>{getAverageRating(reviews)}</span>
        </div>
    );
};

export default RatingBadge;
