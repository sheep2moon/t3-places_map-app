import { Review } from "@prisma/client";
import React, { useEffect, useState, useRef } from "react";
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
    const reviewInputRef = useRef<HTMLTextAreaElement>(null);
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

    const handleUpdateReview = async () => {
        console.log(currentComment, review.comment);

        if (currentComment !== review.comment || currentRate !== review.rate) {
            await updateReviewMutation.mutateAsync({ comment: currentComment, rate: currentRate, reviewId: review.id });
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

    const handleEdit = () => {
        setIsEdit(true);
        setTimeout(() => {
            reviewInputRef?.current?.focus();
        }, 20);
    };

    return (
        <div className="mt-2">
            <span>Twoja opinia</span>
            <ReviewRating disabled={!isEdit} rate={currentRate} setRate={setCurrentRate} />
            <div>
                <TextArea ref={reviewInputRef} disabled={!isEdit} placeholder="Opisz w kilku słowach swoje doświadczenie z tym miejscem." name="comment" value={currentComment} handleChange={e => setCurrentComment(e.target.value)} />
            </div>
            <div className="mt-1 flex w-full justify-between">
                <Button onClick={handleDeleteReview} variant="filled" isLoading={deleteReviewMutation.isLoading}>
                    <RiDeleteBin5Line />
                </Button>
                {isEdit ? (
                    <div className="flex gap-1">
                        <Button className="w-24" onClick={handleCancelChanges} variant="filled">
                            Anuluj
                        </Button>
                        <Button className="w-24" isLoading={updateReviewMutation.isLoading} onClick={handleUpdateReview} variant="filled">
                            Zapisz
                        </Button>
                    </div>
                ) : (
                    <Button onClick={handleEdit} variant="filled">
                        Edytuj
                    </Button>
                )}
            </div>
        </div>
    );
};

export default EditReview;
