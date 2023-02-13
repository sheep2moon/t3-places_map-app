import clsx from "clsx";
import React from "react";
import { trpc } from "../../utils/trpc";
import { useNewPlaceStore } from "../../zustand/newPlaceStore";
import Label from "../common/Label";
import LoadingSpinner from "../common/LoadingSpinner";
import PlaceTypeIcon from "../place/PlaceTypeIcon";

const SelectPlaceType = () => {
    const placeTypes = trpc.useQuery(["places.getPlaceTypes"]);
    const { placeTypeId, setPlaceTypeId, errors, setError } = useNewPlaceStore(state => state);
    if (placeTypes.isLoading) return <LoadingSpinner />;

    const handlePlaceTypeSelect = (id: string) => {
        setPlaceTypeId(id);
        if (errors.get("type")) {
            setError("type", false);
        }
    };

    return (
        <div className="mt-4">
            <Label isError={errors.get("type")}>Typ miejsca</Label>
            <div className="flex gap-1">
                {placeTypes.data?.map(placeType => (
                    <div key={placeType.id} className={clsx("flex flex-col items-center p-2 transition-all", { "rounded-md bg-slate-400/20": placeTypeId === placeType.id })} onClick={() => handlePlaceTypeSelect(placeType.id)}>
                        <PlaceTypeIcon placeType={placeType} />
                        <span>{placeType.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectPlaceType;
