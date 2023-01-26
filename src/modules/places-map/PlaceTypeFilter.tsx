import clsx from "clsx";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect } from "react";
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
    const router: NextRouter = useRouter();

    const handleSelectPlaceType = (typeId: string) => {
        if (selectedTypeId !== typeId) setSelectedTypeId(typeId);
        else setSelectedTypeId("");
    };

    // useEffect(() => {
    //     if (selectedTypeId) {
    //         router.replace({ pathname: router.pathname, query: selectedTypeId }, undefined, { shallow: true });
    //     }
    // }, [selectedTypeId]);

    useEffect(() => {
        const typeId = router.query.typeId as string;
        if (typeId) {
            setSelectedTypeId(typeId);
            router.replace({ pathname: router.pathname, query: "" }, undefined, { shallow: true });
        }
    }, []);

    if (isLoading) return <LoadingSpinner />;
    return (
        <div className="fixed bottom-0 left-1/2 right-0 z-[999] flex h-16 w-full max-w-screen-large -translate-x-1/2 flex-col gap-1 bg-light py-1 shadow-md shadow-black/50 dark:bg-dark">
            <ul className="mx-1 -mb-px flex h-full flex-wrap gap-1 rounded-t-md text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                {data?.map(place => (
                    <li key={place.id} className="rounded-sm bg-dark/10 dark:bg-primary">
                        <button
                            className={clsx("flex h-full w-[160px] items-center rounded-t-lg border-b-2 border-transparent px-2 hover:border-indigo-400 hover:text-gray-600 dark:hover:text-gray-300", {
                                "border-indigo-600 bg-indigo-200 text-primary hover:border-indigo-600 dark:border-secondary dark:text-gray-200": selectedTypeId === place.id
                            })}
                            onClick={() => handleSelectPlaceType(place.id)}
                        >
                            <div className="mr-2 w-8">
                                <PlaceTypeIcon size="sm" placeType={place} />
                            </div>
                            <span className="text-base">{place.title}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlaceTypeFilter;
