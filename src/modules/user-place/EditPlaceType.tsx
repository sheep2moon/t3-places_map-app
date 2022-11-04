import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import LoadingSpinner from "../common/LoadingSpinner";
import PlaceType from "../place/PlaceType";
import LabelBar, { LabelBarProps } from "./LabelBar";

const EditPlaceType = ({ placeTypeId }: { placeTypeId: string }) => {
    const placeTypes = trpc.useQuery(["places.getPlaceTypes"]);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleConfirm = () => {
        setIsEditing(false);
    };
    const handleCancel = () => {
        setIsEditing(false);
    };

    if (placeTypes.isLoading) return <LoadingSpinner />;

    const labelBarProps: LabelBarProps = {
        label: "Typ miejsca",
        isEditing,
        handleCancel,
        handleConfirm,
        handleEdit
    };

    return (
        <div className="flex flex-col">
            <LabelBar {...labelBarProps} />
            <div className="flex rounded-b-md bg-slate-300/20 pt-2">
                {placeTypes.data?.map(placeType => (
                    <div key={placeType.id}>
                        <PlaceType placeType={placeType} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EditPlaceType;
