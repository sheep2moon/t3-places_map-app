import { PlaceType } from "@prisma/client";
import clsx from "clsx";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { VscTriangleRight } from "react-icons/vsc";
import { trpc } from "../../utils/trpc";
import { usePlacesMapStore } from "../../zustand/placesMapStore";
import LoadingSpinner from "../common/LoadingSpinner";
import PlaceTypeIcon from "../place/PlaceTypeIcon";

type PlaceTypeFilterProps = {
    placeTypes: PlaceType[];
};

const PlaceTypeFilter = ({ placeTypes }: PlaceTypeFilterProps) => {
    // const { data, isLoading } = trpc.useQuery(["places.getPlaceTypes"]);
    console.log(placeTypes);

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

    // if (isLoading) return <LoadingSpinner />;
    return (
        <div
            onMouseLeave={() => setIsExpanded(false)}
            onMouseEnter={() => setIsExpanded(true)}
            className={clsx("relative block bg-primary shadow-md shadow-black transition-all hover:transition-all", { "w-64": isExpanded, "w-[72px]": !isExpanded })}
        >
            <div className={clsx("flex h-12 items-center")}>
                <FiFilter className="ml-5 shrink-0 text-3xl" />
                {isExpanded && <p className="ml-5 overflow-hidden whitespace-nowrap font-bold">Filtruj typ miejsca</p>}
            </div>
            <div
                className={clsx("absolute -left-1 flex h-16 w-1 translate-y-12 flex-col justify-center rounded-r-md bg-indigo-600  transition-all", { hidden: indicatorPosition === null })}
                style={{ top: `${(indicatorPosition ? indicatorPosition : 0) * 4}rem` }}
            >
                <VscTriangleRight className="-translate-x-[4px] text-xl text-indigo-600" />
            </div>
            <ul className="flex flex-col rounded-t-md text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                {placeTypes?.map((place, index) => (
                    <li
                        key={place.id}
                        className={clsx("py-1 px-2", {
                            "bg-dark": selectedTypeId === place.id
                        })}
                    >
                        <button className={clsx("flex items-center gap-2 hover:border-indigo-400 hover:text-gray-600 dark:hover:text-gray-300")} onClick={() => handleSelectPlaceType(place.id, index)}>
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
