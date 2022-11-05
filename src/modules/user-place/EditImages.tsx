import { useRouter } from "next/router";
import React, { useState } from "react";
import ImageInput from "./ImagesInput";
import LabelBar, { LabelBarProps } from "./LabelBar";

// type EditImagesProps = {
//     placeId: string;
// };

const EditImages = () => {
    const { query } = useRouter();
    const id = query.id as string;

    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleConfirm = () => {
        //save
        setIsEditing(false);
    };
    const handleCancel = () => {
        setIsEditing(false);
    };

    const labelBarProps: LabelBarProps = {
        label: "Zdjęcia",
        isEditing,
        handleCancel,
        handleEdit,
        handleConfirm
    };

    return (
        <div className="flex flex-col gap-1">
            <LabelBar {...labelBarProps} />
            <div>
                <ImageInput placeId={id} />
            </div>
        </div>
    );
};

export default EditImages;
