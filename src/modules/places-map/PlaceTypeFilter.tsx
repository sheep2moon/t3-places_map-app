import clsx from "clsx";
import React from "react";
import { trpc } from "../../utils/trpc";
import { usePlacesMapStore } from "../../zustand/placesMapStore";
import LoadingSpinner from "../common/LoadingSpinner";
import PlaceTypeIcon from "../place/PlaceTypeIcon";

// type PlaceTypeFilterProps = {
//     selectTypeId: (typeId: string) => void;
//     selectedTypeId: string;
// };

const PlaceTypeFilter = () => {
    const { data, isLoading } = trpc.useQuery(["places.getPlaceTypes"]);
    const { selectedTypeId, setSelectedTypeId } = usePlacesMapStore(state => state);

    const handleSelectPlaceType = (typeId: string) => {
        if (selectedTypeId !== typeId) setSelectedTypeId(typeId);
        else setSelectedTypeId("");
    };

    if (isLoading) return <LoadingSpinner />;
    return (
        <div className="m-2 flex w-full flex-col gap-1  xsmall:max-w-[600px]">
            <h2 className="ml-2 block w-full border-b border-secondary">Filtruj</h2>
            <div className="flex">
                {data?.map(place => (
                    <button className={clsx("", { "bg-slate-200/20": selectedTypeId === place.id })} key={place.id} onClick={() => handleSelectPlaceType(place.id)}>
                        <PlaceTypeIcon size="md" placeType={place} />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PlaceTypeFilter;
