import { Place, PlaceType, Review, User, Image as ImageType } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { IoStar } from "react-icons/io5";
import { getPlaceRouterHref } from "../../../utils/getPlaceUrls";
import UserBadge from "../../common/badges/UserBadge";
import HorizontalLine from "../../common/HorizontalLine";
import PlaceTypeIcon from "../../place/PlaceTypeIcon";

export type RecentlyAddedReviewsProps = {
    recentlyAddedReviews: (Review & { user: User; Place: Place & { type: PlaceType; images: ImageType } })[];
};

const RecentlyAddedReviews = ({ recentlyAddedReviews }: RecentlyAddedReviewsProps) => {
    // const { data, isLoading } = trpc.useQuery(["places.getRecentlyAddedReviews"]);

    return (
        <div className="flex flex-col py-4">
            <HorizontalLine>
                <h2 className="text-lg font-extralight md:text-xl lg:text-2xl">Ostatnie recenzje</h2>
            </HorizontalLine>
            {/* {isLoading && <LoadingSkeleton />} */}
            <div className="mt-4 flex h-full w-full gap-2 overflow-x-auto px-4">
                {recentlyAddedReviews.map(review => (
                    <div key={review.id} className="flex h-48 min-w-[20rem] flex-col justify-between rounded-md border border-secondary/10 bg-light p-2 shadow-md dark:bg-dark">
                        <span className="flex w-full items-center justify-between text-xs">
                            <UserBadge user={review.user} />
                            <span className="flex items-center gap-1">
                                <p className="text-lg font-bold">{review.rate}</p>
                                <IoStar className="text-xl text-amber-400" />
                            </span>
                        </span>
                        <HorizontalLine />

                        <span>{review.comment}</span>
                        <Link className="mt-auto flex items-center gap-1" href={getPlaceRouterHref(review.Place.id)}>
                            {review.Place?.type && <PlaceTypeIcon size="sm" placeType={review.Place.type} />}

                            <p className="max-h-5 overflow-hidden overflow-ellipsis whitespace-nowrap text-base font-bold leading-5">{review.Place?.displayName}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentlyAddedReviews;

// const LoadingSkeleton = () => {
//     return (
//         <div className="mt-4 grid h-48 w-full flex-wrap gap-2 overflow-hidden px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//             <div className="h-48 w-full min-w-[220px] max-w-md">
//                 <BlockSkeleton />
//             </div>
//             <div className="h-48 w-full min-w-[220px] max-w-md">
//                 <BlockSkeleton />
//             </div>
//             <div className="h-48 w-full min-w-[220px] max-w-md">
//                 <BlockSkeleton />
//             </div>
//             <div className="h-48 w-full min-w-[220px] max-w-md">
//                 <BlockSkeleton />
//             </div>
//         </div>
//     );
// };
