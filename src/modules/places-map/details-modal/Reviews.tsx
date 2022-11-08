import React from "react";
import { IoStar } from "react-icons/io5";
import { trpc } from "../../../utils/trpc";
import LoadingSpinner from "../../common/LoadingSpinner";
import TimeBadge from "../../common/badges/TimeBadge";
import UserAvatar from "../../common/UserAvatar";
import HorizontalLine from "../../common/HorizontalLine";
import { GiStarsStack } from "react-icons/gi";
import { MdReviews } from "react-icons/md";

type ReviewsProps = {
    placeId: string;
};

const Reviews = ({ placeId }: ReviewsProps) => {
    const { data, isLoading } = trpc.useQuery(["places.getPlaceReviews", { placeId }]);
    if (isLoading) return <LoadingSpinner />;
    return (
        <div className="mt-4">
            <div className="flex w-full justify-center text-xs text-primary dark:text-light">
                {data && data.length > 0 ? (
                    <HorizontalLine>
                        <div className="text-md flex items-center gap-1">
                            <span>Opinie</span>
                            <MdReviews className="text-lg text-amber-300" />
                        </div>
                    </HorizontalLine>
                ) : (
                    <span>To miejsce nie ma jeszcze żadnych opinii</span>
                )}
            </div>
            {data?.map(review => (
                <div key={review.id} className="my-2 rounded-sm bg-primary/5 p-1">
                    <div className="mb-2 flex items-center gap-2 ">
                        <UserAvatar size={6} image={review.user.image ?? ""} />
                        {review.user.name}
                        <span className="flex items-center text-amber-400">
                            {review.rate}
                            <IoStar />
                        </span>
                        <TimeBadge>{review.createdAt.toLocaleString()}</TimeBadge>
                        <span className=" text-xs "></span>
                    </div>
                    <div className="flex rounded-md ">{review.comment}</div>
                </div>
            ))}
        </div>
    );
};

export default Reviews;
