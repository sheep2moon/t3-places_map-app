import clsx from "clsx";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
    const [isExpanded, setIsExpanded] = useState(false);
    const { selectedTypeId, setSelectedTypeId } = usePlacesMapStore(state => state);
    const [indicatorPosition, setIndicatorPosition] = useState<number | null>(null);
    const router: NextRouter = useRouter();

    const handleSelectPlaceType = (typeId: string, index: number) => {
        if (selectedTypeId !== typeId) {
            setSelectedTypeId(typeId);
            setIndicatorPosition(index);
        } else {
            setSelectedTypeId("");
            setIndicatorPosition(null);
        }
    };

    useEffect(() => {
        const typeId = router.query.typeId as string;
        if (typeId) {
            setSelectedTypeId(typeId);
            router.replace({ pathname: router.pathname, query: "" }, undefined, { shallow: true });
        }
    }, []);

    if (isLoading) return <LoadingSpinner />;
    return (
        <div className={clsx("relative hidden w-16 bg-dark shadow-md shadow-black transition-all small:block", { "w-64": isExpanded })}>
            <div className={clsx("absolute -left-1 h-16 w-1 rounded-l-md bg-indigo-600  transition-all", { hidden: indicatorPosition === null })} style={{ top: `${(indicatorPosition ? indicatorPosition : 0) * 4}rem` }}></div>
            <ul onMouseLeave={() => setIsExpanded(false)} onMouseEnter={() => setIsExpanded(true)} className="mx-1 flex h-full flex-col rounded-t-md text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                {data?.map((place, index) => (
                    <li key={place.id} className="py-1">
                        <button
                            className={clsx("flex items-center gap-2 hover:border-indigo-400 hover:text-gray-600 dark:hover:text-gray-300", {
                                "rounded-full outline-2 outline-secondary": selectedTypeId === place.id
                            })}
                            onClick={() => handleSelectPlaceType(place.id, index)}
                        >
                            <PlaceTypeIcon size="md" placeType={place} />
                            {isExpanded && <span className="whitespace-nowrap text-base">{place.title}</span>}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlaceTypeFilter;
