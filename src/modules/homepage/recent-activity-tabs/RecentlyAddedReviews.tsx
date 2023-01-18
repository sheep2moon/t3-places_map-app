import React from "react";
import { IoStar } from "react-icons/io5";
import { UseQueryResult } from "react-query";
import { inferQueryOutput } from "../../../utils/trpc";
import PlaceTypeBadge from "../../common/badges/PlaceTypeBadge";
import TimeBadge from "../../common/badges/TimeBadge";
import UserBadge from "../../common/badges/UserBadge";
import HorizontalLine from "../../common/HorizontalLine";
import LoadingSpinner from "../../common/LoadingSpinner";

type RecentlyAddedReviewsProps = {
    queryResult: UseQueryResult<inferQueryOutput<"places.getRecentlyAddedReviews">>;
};

const RecentlyAddedReviews = ({ queryResult }: RecentlyAddedReviewsProps) => {
    if (queryResult.isLoading)
        return (
            <div className="relative h-full w-full">
                <LoadingSpinner />
            </div>
        );

    return (
        <div className="grid h-full w-full gap-2 overflow-x-auto small:grid-cols-3">
            {queryResult.data?.map(review => (
                <div key={review.id} className="flex h-full w-full min-w-[260px] max-w-md flex-col justify-between rounded-md border border-secondary/10 bg-light/20 p-2 shadow-md dark:bg-dark">
                    <span className="flex w-full items-center justify-between text-xs">
                        <UserBadge user={review.user} />
                        <TimeBadge>{review.createdAt.toLocaleDateString()}</TimeBadge>
                    </span>
                    <HorizontalLine />
                    <span className="flex items-center gap-2">
                        <p>{review.rate}</p>
                        <IoStar />
                    </span>
                    <span>{review.comment}</span>
                    <div className="mt-auto">
                        {review.Place?.type && <PlaceTypeBadge placeType={review.Place.type} size="sm" />}

                        <p className="mt-2 max-h-6 overflow-hidden overflow-ellipsis whitespace-nowrap text-xl font-bold leading-6">{review.Place?.displayName}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecentlyAddedReviews;
