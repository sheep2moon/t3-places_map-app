import React, { useState } from "react";
import { trpc } from "../../../utils/trpc";
import Button from "../../common/Button";
import TextArea from "../../common/TextArea";
import AddRating from "./AddRating";

type AddReviewType = {
    placeId: string;
};

const AddReview = ({ placeId }: AddReviewType) => {
    const { mutateAsync: addReview } = trpc.useMutation(["protectedPlace.addReview"]);
    const [comment, setComment] = useState<string>("");
    const [rate, setRate] = useState<number>(0);

    const handleAddReview = () => {
        if (placeId && comment && rate) {
            addReview({ placeId, comment, rate });
        }
    };

    return (
        <div className="mt-2">
            <span className="text-sm font-light ">Widziałeś to miejsce? Przekaż swoją opinie.</span>
            <AddRating rate={rate} setRate={setRate} />
            <div>
                <TextArea placeholder="Opisz w kilku słowach swoje doświadczenie z tym miejscem." name="comment" value={comment} handleChange={e => setComment(e.target.value)} />
            </div>
            <Button className="ml-auto mt-1 w-fit" variant="alternative" onClick={handleAddReview}>
                Dodaj recenzje
            </Button>
        </div>
    );
};

export default AddReview;
