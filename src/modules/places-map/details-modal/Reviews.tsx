import React from "react";
import { IoStar } from "react-icons/io5";
import { trpc } from "../../../utils/trpc";
import LoadingSpinner from "../../common/LoadingSpinner";
import UserAvatar from "../../common/UserAvatar";

type ReviewsProps = {
    placeId: string;
};

const Reviews = ({ placeId }: ReviewsProps) => {
    const { data, isLoading } = trpc.useQuery(["places.getPlaceReviews", { placeId }]);
    if (isLoading) return <LoadingSpinner />;
    return (
        <div className="my-2">
            <div className="text-xs">{data && data.length > 1 ? <span>Opinie o miejscu</span> : <span>To miejsce nie ma jeszcze żadnych opinii</span>}</div>
            {data?.map(review => (
                <div key={review.id} className="my-2 rounded-sm bg-primary/5 p-1">
                    <div className="mb-2 flex items-center gap-2 ">
                        <UserAvatar size={6} image={review.user.image ?? ""} />
                        {review.user.name}
                        <span className="ml-auto flex items-center text-amber-400">
                            {review.rate}
                            <IoStar />
                        </span>
                    </div>
                    <div className="flex rounded-md ">{review.comment}</div>
                </div>
            ))}
        </div>
    );
};

export default Reviews;
