import React, { useState } from "react";
import { trpc } from "../../../utils/trpc";
import TextArea from "../../common/TextArea";

type AddReviewType = {
    placeId: string;
};

const AddReview = ({ placeId }: AddReviewType) => {
    const { mutateAsync: addReview } = trpc.useMutation(["protectedPlace.addReview"]);
    const [comment, setComment] = useState<string>("");
    const [rate, setRate] = useState<null | number>(null);

    // const handleAddReview = () => {
    //     addReview({placeId,})
    // }

    return (
        <div>
            <span>Dodaj recenzje</span>
            <div>
                <TextArea name="comment" value={comment} handleChange={e => setComment(e.target.value)} />
            </div>
        </div>
    );
};

export default AddReview;
