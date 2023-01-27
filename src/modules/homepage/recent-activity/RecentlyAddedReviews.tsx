import { Place, PlaceType, Review, User, Image as ImageType } from "@prisma/client";
import React from "react";
import { IoStar } from "react-icons/io5";
import { trpc } from "../../../utils/trpc";
import UserBadge from "../../common/badges/UserBadge";
import HorizontalLine from "../../common/HorizontalLine";
import BlockSkeleton from "../../common/skeletons/BlockSkeleton";
import PlaceTypeIcon from "../../place/PlaceTypeIcon";

export type RecentlyAddedReviewsProps = {
    recentlyAddedReviews: (Review & { user: User; Place: Place & { type: PlaceType; images: ImageType } })[];
};

const RecentlyAddedReviews = ({ recentlyAddedReviews }: RecentlyAddedReviewsProps) => {
    const { data, isLoading } = trpc.useQuery(["places.getRecentlyAddedReviews"]);

    return (
        <div className="mt-8 flex flex-col">
            <HorizontalLine>
                <h2 className="text-lg font-bold md:text-xl lg:text-2xl">Ostatnie recenzje</h2>
            </HorizontalLine>
            {isLoading && <LoadingSkeleton />}
            <div className="mt-4 grid h-full w-full gap-2 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {recentlyAddedReviews.map(review => (
                    <div key={review.id} className="flex h-48 w-full min-w-[260px] max-w-md flex-col justify-between rounded-md border border-secondary/10 bg-light p-2 shadow-md dark:bg-dark">
                        <span className="flex w-full items-center justify-between text-xs">
                            <UserBadge user={review.user} />
                            <span className="flex items-center gap-1">
                                <p className="text-lg font-bold">{review.rate}</p>
                                <IoStar className="text-xl text-amber-400" />
                            </span>
                        </span>
                        <HorizontalLine />

                        <span>{review.comment}</span>
                        <div className="mt-auto flex items-center gap-1">
                            {review.Place?.type && <PlaceTypeIcon size="sm" placeType={review.Place.type} />}

                            <p className="max-h-5 overflow-hidden overflow-ellipsis whitespace-nowrap text-base font-bold leading-5">{review.Place?.displayName}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentlyAddedReviews;

const LoadingSkeleton = () => {
    return (
        <div className="mt-4 grid h-48 w-full flex-wrap gap-2 overflow-hidden px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="h-48 w-full min-w-[220px] max-w-md">
                <BlockSkeleton />
            </div>
            <div className="h-48 w-full min-w-[220px] max-w-md">
                <BlockSkeleton />
            </div>
            <div className="h-48 w-full min-w-[220px] max-w-md">
                <BlockSkeleton />
            </div>
            <div className="h-48 w-full min-w-[220px] max-w-md">
                <BlockSkeleton />
            </div>
        </div>
    );
};
