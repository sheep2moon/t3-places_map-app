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
        <div className="flex w-full flex-col gap-1 pt-2">
            {/* <h2 className="block w-full border-b border-secondary pl-2">Filtruj</h2> */}
            <ul className="-mb-px flex flex-wrap rounded-t-md text-center text-sm font-medium text-gray-500 dark:bg-black/10 dark:text-gray-400">
                {data?.map(place => (
                    <li key={place.id} className="mr-2">
                        <button
                            className={clsx("inline-flex w-[140px] items-center rounded-t-lg border-b-2 border-transparent p-2 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300", {
                                "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-gray-200": selectedTypeId === place.id
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

        // <div className="border-b border-gray-200 dark:border-gray-700">
        //     <ul className="-mb-px flex flex-wrap text-center text-sm font-medium text-gray-500 dark:text-gray-400">
        //         <li className="mr-2">
        //             <a href="#" className="group inline-flex rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300">
        //                 <PlaceTypeIcon size="md" placeType={place} />
        //                 Profile
        //             </a>
        //         </li>
        //         <li className="mr-2">
        //             <a href="#" className="active group inline-flex rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500" aria-current="page">

        //                 Dashboard
        //             </a>
        //         </li>
        //     </ul>
        // </div>
    );
};

export default PlaceTypeFilter;
