import React, { ChangeEvent, useRef, useState } from "react";
import Button from "../common/Button";
import EditButton from "../common/EditButton";
import TextArea from "../common/TextArea";
import LabelBar, { LabelBarProps } from "./LabelBar";

const EditDescription = ({ description }: { description: string }) => {
    const [currentDescription, setCurrentDescription] = useState(description);
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentDescription(e.target.value);
    };
    const [isEditing, setIsEditing] = useState(false);
    const descriptonInputRef = useRef<HTMLTextAreaElement>(null);

    const handleEdit = () => {
        setIsEditing(true);
        setTimeout(() => {
            descriptonInputRef.current?.focus();
        }, 20);
    };

    const handleConfirm = () => {
        //save
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
            <textarea ref={descriptonInputRef} className=" h-32 w-full rounded-b-md bg-light px-2 py-1 text-primary" disabled={!isEditing} onChange={handleChange} value={currentDescription} name="description" />
        </div>
    );
};

export default EditDescription;
