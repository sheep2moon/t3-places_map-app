import clsx from "clsx";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import LoadingSpinner from "../common/LoadingSpinner";
import PlaceTypeIcon from "../place/PlaceTypeIcon";
import LabelBar, { LabelBarProps } from "./LabelBar";

type EditPlaceTypeProps = {
    placeTypeId: string;
    placeId: string;
};

const EditPlaceType = ({ placeTypeId, placeId }: EditPlaceTypeProps) => {
    const placeTypes = trpc.useQuery(["places.getPlaceTypes"]);
    const [currentPlaceType, setCurrentPlaceType] = useState(placeTypeId);
    const [isEditing, setIsEditing] = useState(false);
    const { mutateAsync: updatePlaceType } = trpc.useMutation(["protectedPlace.updatePlaceType"]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleConfirm = () => {
        updatePlaceType({ placeId, placeTypeId: currentPlaceType });
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
            <div className="flex gap-2 rounded-b-md bg-slate-300/20 p-2">
                {placeTypes.data?.map(placeType => (
                    <div key={placeType.id} onClick={() => handleSelect(placeType.id)} className={clsx("rounded-full", { " bg-slate-900/20 outline outline-4 outline-secondary": currentPlaceType === placeType.id })}>
                        <PlaceTypeIcon placeType={placeType} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EditPlaceType;
