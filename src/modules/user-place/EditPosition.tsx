import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import PositionMap from "../map/PositionMap";
import LabelBar from "./LabelBar";

type EditPositionProps = {
    position: Position;
    placeId: string;
};

const EditPosition = ({ position, placeId }: EditPositionProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentPosition, setCurrentPosition] = useState(position);
    const { mutateAsync: updatePosition } = trpc.useMutation(["protectedPlace.updatePosition"]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleConfirm = () => {
        updatePosition({ lat: currentPosition.lat, lng: currentPosition.lng, placeId });
        setIsEditing(false);
    };
    const handleCancel = () => {
        setIsEditing(false);
        setCurrentPosition(position);
    };

    const labelBarProps = {
        label: "Pozycja",
        isEditing,
        handleEdit,
        handleCancel,
        handleConfirm
    };

    return (
        <div>
            <LabelBar {...labelBarProps} />
            <PositionMap disabled={!isEditing} position={currentPosition} setPosition={setCurrentPosition} />
        </div>
    );
};

export default EditPosition;
