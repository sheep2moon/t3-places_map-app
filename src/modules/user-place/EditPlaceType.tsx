import clsx from "clsx";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import LoadingSpinner from "../common/LoadingSpinner";
import PlaceTypeIcon from "../place/PlaceTypeIcon";
import LabelBar, { LabelBarProps } from "./LabelBar";

const EditPlaceType = ({ placeTypeId }: { placeTypeId: string }) => {
    const placeTypes = trpc.useQuery(["places.getPlaceTypes"]);
    const [currentPlaceType, setCurrentPlaceType] = useState(placeTypeId);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleConfirm = () => {
        setIsEditing(false);
    };
    const handleCancel = () => {
        setIsEditing(false);
        setCurrentPlaceType(placeTypeId);
    };

    const handleSelect = (typeId: string) => {
        if (isEditing) {
            setCurrentPlaceType(typeId);
        }
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
            <div className="flex rounded-b-md bg-slate-300/20 p-2">
                {placeTypes.data?.map(placeType => (
                    <div key={placeType.id} onClick={() => handleSelect(placeType.id)} className={clsx("rounded-md", { " bg-slate-900/20 outline outline-2 outline-emerald-400": currentPlaceType === placeType.id })}>
                        <PlaceTypeIcon placeType={placeType} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EditPlaceType;
