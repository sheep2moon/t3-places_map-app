import { Review } from "@prisma/client";
import React from "react";
import { UseQueryResult } from "react-query";
import LoadingSpinner from "../../common/LoadingSpinner";

type RecentlyAddedReviewsProps = {
    queryResult: UseQueryResult<Review[]>;
};

const RecentlyAddedReviews = ({ queryResult }: RecentlyAddedReviewsProps) => {
    if (queryResult.isLoading) return <LoadingSpinner />;
    return (
        <div className="grid w-full grid-cols-3">
            {queryResult.data?.map(review => (
                <div key={review.id}>
                    <span>{review.comment}</span>
                </div>
            ))}
        </div>
    );
};

export default RecentlyAddedReviews;
