import React, { useState } from "react";
import { trpc } from "../../../utils/trpc";
import Button from "../../common/Button";
import TextArea from "../../common/TextArea";
import ReviewRating from "./ReviewRating";

type AddReviewType = {
    placeId: string;
};

const AddReview = ({ placeId }: AddReviewType) => {
    const ctx = trpc.useContext();
    const addReviewMutation = trpc.useMutation(["protectedPlace.addReview"], { onSuccess: () => ctx.invalidateQueries("places.getPlaceReviews") });

    const [comment, setComment] = useState<string>("");
    const [rate, setRate] = useState<number>(0);

    const handleAddReview = () => {
        if (placeId && comment && rate) {
            addReviewMutation.mutateAsync({ placeId, comment, rate });
            setComment("");
            setRate(0);
        }
    };

    return (
        <div className="mt-2">
            <span className="text-sm font-light ">Widziałeś to miejsce? Przekaż swoją opinie.</span>
            <ReviewRating disabled={false} rate={rate} setRate={setRate} />
            <div>
                <TextArea placeholder="Opisz w kilku słowach swoje doświadczenie z tym miejscem." name="comment" value={comment} handleChange={e => setComment(e.target.value)} />
            </div>
            <div className="mt-1 w-full">
                <Button isLoading={addReviewMutation.isLoading} variant="alternative" onClick={handleAddReview}>
                    Dodaj recenzje
                </Button>
            </div>
        </div>
    );
};

export default AddReview;
