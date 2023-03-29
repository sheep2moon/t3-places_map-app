import React from "react";
import { IoStar } from "react-icons/io5";
import { trpc } from "../../../../utils/trpc";
import LoadingSpinner from "../../../common/LoadingSpinner";
import TimeBadge from "../../../common/badges/TimeBadge";
import UserAvatar from "../../../common/UserAvatar";
import HorizontalLine from "../../../common/HorizontalLine";
import { MdReviews } from "react-icons/md";

type ReviewsProps = {
  placeId: string;
};

const Reviews = ({ placeId }: ReviewsProps) => {
  const { data, isLoading } = trpc.useQuery([
    "places.getPlaceReviews",
    { placeId },
  ]);
  return (
    <div className="mt-8 px-2">
      <div className="flex w-full justify-center text-xs text-primary dark:text-light">
        {data && data.length > 0 ? (
          <HorizontalLine>
            <div className="flex items-center gap-1 text-base">
              <MdReviews className="text-lg text-amber-300" />
              <span>Opinie</span>
            </div>
          </HorizontalLine>
        ) : (
          <span>To miejsce nie ma jeszcze żadnych opinii</span>
        )}
      </div>
      {isLoading && (
        <div className="relative h-48 w-full">
          <LoadingSpinner />
        </div>
      )}
      {data?.map((review) => (
        <div
          key={review.id}
          className="mt-2 rounded-sm border border-indigo-200 bg-indigo-100 p-2 dark:border-indigo-900 dark:bg-black/20"
        >
          <div className="mb-2 flex items-center justify-between ">
            <div className="flex items-center gap-2">
              <UserAvatar size={6} image={review.user.image ?? ""} />
              {review.user.name}
              <span className="flex items-center text-amber-400">
                {review.rate}
                <IoStar />
              </span>
            </div>
            <TimeBadge>{review.createdAt.toLocaleString()}</TimeBadge>
          </div>
          <div className="flex rounded-sm p-1 text-base dark:bg-primary/50 ">
            {review.comment}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
