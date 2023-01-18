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
        <div className="fixed bottom-0 left-1/2 right-0 z-[999] flex h-16 w-full max-w-screen-large -translate-x-1/2 flex-col gap-1 bg-light pt-2 shadow-md shadow-black/50 dark:bg-dark">
            <ul className="mx-1 -mb-px flex flex-wrap gap-1 rounded-t-md text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                {data?.map(place => (
                    <li key={place.id} className="rounded-sm bg-dark/10 dark:bg-primary">
                        <button
                            className={clsx("inline-flex w-[140px] items-center rounded-t-lg border-b-2 border-transparent p-2 hover:border-gray-500 hover:text-gray-600 dark:hover:text-gray-300", {
                                "border-dark text-primary dark:border-secondary dark:text-gray-200": selectedTypeId === place.id
                            })}
                            onClick={() => handleSelectPlaceType(place.id)}
                        >
                            <PlaceTypeIcon className="mr-2" size="sm" placeType={place} />
                            <span className="text-lg">{place.title}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlaceTypeFilter;
