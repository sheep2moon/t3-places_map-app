import React from "react";
import { IoStar } from "react-icons/io5";
import { trpc } from "../../../utils/trpc";
import PlaceTypeBadge from "../../common/badges/PlaceTypeBadge";
import TimeBadge from "../../common/badges/TimeBadge";
import UserBadge from "../../common/badges/UserBadge";
import HorizontalLine from "../../common/HorizontalLine";
import LoadingSpinner from "../../common/LoadingSpinner";

const RecentlyAddedReviews = () => {
    const recentlyAddedReviews = trpc.useQuery(["places.getRecentlyAddedReviews"]);

    if (recentlyAddedReviews.isLoading)
        return (
            <div className="relative h-full w-full">
                <LoadingSpinner />
            </div>
        );

    return (
        <div className="mt-8 flex flex-col">
            <HorizontalLine>
                <h2 className="text-lg font-bold md:text-xl lg:text-2xl">Ostatnie recenzje</h2>
            </HorizontalLine>
            <div className="mt-4 grid h-full w-full gap-2 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {recentlyAddedReviews.data?.map(review => (
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
        </div>
    );
};

export default RecentlyAddedReviews;
