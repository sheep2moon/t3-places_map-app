import React from "react";
import Button from "../common/Button";
import EditButton from "../common/EditButton";

export type LabelBarProps = {
    label: string;
    isEditing?: boolean;
    handleCancel?: () => void;
    handleEdit?: () => void;
    handleConfirm?: () => void;
};

const LabelBar = ({ label, isEditing, handleCancel, handleEdit, handleConfirm }: LabelBarProps) => {
    return (
        <div className="mt-2 flex items-center justify-between rounded-t-md bg-black/30 p-2">
            <label htmlFor="description" className="">
                {label}
            </label>
            {isEditing ? (
                <div className="flex gap-1">
                    <Button onClick={handleCancel} variant="secondary">
                        Anuluj
                    </Button>
                    <Button onClick={handleConfirm} variant="secondary">
                        Zapisz
                    </Button>
                </div>
            ) : (
                typeof isEditing !== "undefined" && <EditButton onClick={handleEdit}>Edytuj</EditButton>
            )}
        </div>
    );
};

export default LabelBar;
