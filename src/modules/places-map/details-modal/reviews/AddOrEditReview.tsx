import React from "react";
import { trpc } from "../../../../utils/trpc";
import AddReview from "./AddReview";
import EditReview from "./EditReview";

type AddOrEditReviewProps = {
    placeId: string;
};

const AddOrEditReview = ({ placeId }: AddOrEditReviewProps) => {
    const { data, isLoading } = trpc.useQuery(["user.getUserReviewByPlaceId", { placeId }]);
    if (!data || isLoading) return <AddReview placeId={placeId} />;
    else return <EditReview review={data} />;
};

export default AddOrEditReview;
