import React, { ChangeEvent, useRef, useState } from "react";
import { trpc } from "../../utils/trpc";
import LabelBar, { LabelBarProps } from "./LabelBar";

type EditDescriptionProps = {
    description: string;
    placeId: string;
};

const EditDescription = ({ description, placeId }: EditDescriptionProps) => {
    const [currentDescription, setCurrentDescription] = useState(description);
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentDescription(e.target.value);
    };
    const { mutateAsync: updateDescription } = trpc.useMutation(["protectedPlace.updateDescription"]);
    const [isEditing, setIsEditing] = useState(false);
    const descriptonInputRef = useRef<HTMLTextAreaElement>(null);

    const handleEdit = () => {
        setIsEditing(true);
        setTimeout(() => {
            descriptonInputRef.current?.focus();
        }, 20);
    };

    const handleConfirm = () => {
        updateDescription({ placeId, description: currentDescription });
        setIsEditing(false);
    };
    const handleCancel = () => {
        setCurrentDescription(description);
        setIsEditing(false);
    };

    const labelBarProps: LabelBarProps = {
        label: "Opis miejsca",
        isEditing,
        handleCancel,
        handleEdit,
        handleConfirm
    };

    return (
        <div>
            <LabelBar {...labelBarProps} />
            <textarea ref={descriptonInputRef} className=" disabled:bg-slate-300/15 h-32 w-full rounded-b-md bg-light bg-slate-300/20 px-2 py-1 " disabled={!isEditing} onChange={handleChange} value={currentDescription} name="description" />
        </div>
    );
};

export default EditDescription;
