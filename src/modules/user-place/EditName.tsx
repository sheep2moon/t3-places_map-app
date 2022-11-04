import React, { ChangeEvent, useImperativeHandle, useRef, useState } from "react";
import Button from "../common/Button";
import EditButton from "../common/EditButton";
import InputText from "../common/InputText";
import RoundedButton from "../common/RoundedButton";
import LabelBar, { LabelBarProps } from "./LabelBar";

const EditName = ({ displayName }: { displayName: string }) => {
    const [currentName, setCurrentName] = useState(displayName);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentName(e.target.value);
    };
    const nameInputRef = useRef<HTMLInputElement>(null);

    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
        setTimeout(() => {
            nameInputRef.current?.focus();
        }, 20);
    };

    const handleConfirm = () => {
        //save
        setIsEditing(false);
    };
    const handleCancel = () => {
        setCurrentName(displayName);
        setIsEditing(false);
    };

    const labelBarProps: LabelBarProps = {
        label: "Nazwa",
        isEditing,
        handleCancel,
        handleEdit,
        handleConfirm
    };

    return (
        <div>
            <LabelBar {...labelBarProps} />
            <input
                id="description"
                ref={nameInputRef}
                disabled={!isEditing}
                autoFocus={isEditing}
                onChange={handleChange}
                value={currentName}
                className=" block w-full rounded-b-md border-gray-300 py-2 pl-2 pr-12 text-lg text-black focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-light"
            />
        </div>
    );
};

export default EditName;
