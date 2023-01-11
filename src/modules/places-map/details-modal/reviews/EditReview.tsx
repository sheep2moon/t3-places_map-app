import { Review } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { trpc } from "../../../../utils/trpc";
import Button from "../../../common/Button";
import TextArea from "../../../common/TextArea";
import ReviewRating from "./ReviewRating";
import { RiDeleteBin5Line } from "react-icons/ri";

type EditReviewProps = {
    review: Review;
};

const EditReview = ({ review }: EditReviewProps) => {
    const [currentComment, setCurrentComment] = useState(review.comment);
    const [currentRate, setCurrentRate] = useState(review.rate);
    const [isEdit, setIsEdit] = useState(false);
    const ctx = trpc.useContext();
    const updateReviewMutation = trpc.useMutation(["protectedPlace.updateReview"], {
        onSuccess: () => {
            ctx.invalidateQueries("places.getPlaceReviews");
            ctx.invalidateQueries(["user.getUserReviewByPlaceId"]);
        }
    });
    const deleteReviewMutation = trpc.useMutation(["protectedPlace.deleteReview"], {
        onSuccess: () => {
            ctx.invalidateQueries(["places.getPlaceReviews"]);
            ctx.invalidateQueries(["user.getUserReviewByPlaceId"]);
        }
    });

    useEffect(() => {
        setCurrentComment(review.comment);
        setCurrentRate(review.rate);
    }, [review]);

    const handleUpdateReview = () => {
        console.log(currentComment, review.comment);

        if (currentComment !== review.comment || currentRate !== review.rate) {
            updateReviewMutation.mutateAsync({ comment: currentComment, rate: currentRate, reviewId: review.id });
        }
        setIsEdit(false);
    };

    const handleCancelChanges = () => {
        setIsEdit(false);
        setCurrentComment(review.comment);
        setCurrentRate(review.rate);
    };

    const handleDeleteReview = () => {
        deleteReviewMutation.mutateAsync({ reviewId: review.id });
    };

    return (
        <div className="mt-2">
            <span>Twoja opinia</span>
            <ReviewRating disabled={!isEdit} rate={currentRate} setRate={setCurrentRate} />
            <div>
                <TextArea disabled={!isEdit} placeholder="Opisz w kilku słowach swoje doświadczenie z tym miejscem." name="comment" value={currentComment} handleChange={e => setCurrentComment(e.target.value)} />
            </div>
            <div className="mt-1 flex w-full justify-between">
                <Button onClick={handleDeleteReview} variant="alternative" isLoading={deleteReviewMutation.isLoading}>
                    <RiDeleteBin5Line />
                </Button>
                {isEdit ? (
                    <div className="flex gap-1">
                        <Button onClick={handleCancelChanges} variant="alternative">
                            Anuluj
                        </Button>
                        <Button onClick={handleUpdateReview} variant="alternative">
                            Zapisz
                        </Button>
                    </div>
                ) : (
                    <Button onClick={() => setIsEdit(true)} variant="alternative">
                        Edytuj
                    </Button>
                )}
            </div>
        </div>
    );
};

export default EditReview;
