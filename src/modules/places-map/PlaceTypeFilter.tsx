import { PlaceType } from "@prisma/client";
import clsx from "clsx";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { VscTriangleRight } from "react-icons/vsc";
import { AiOutlineClose } from "react-icons/ai";
import { usePlacesMapStore } from "../../zustand/placesMapStore";
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
            const selectedTypeIndex = placeTypes.findIndex(placeType => placeType.id === typeId);
            setIndicatorPosition(selectedTypeIndex);
            setSelectedTypeId(typeId);
            router.replace({ pathname: router.pathname, query: "" }, undefined, {
                shallow: true
            });
        }

        return () => {
            setIndicatorPosition(null);
            setSelectedTypeId("");
        };
    }, [placeTypes, router, setSelectedTypeId]);

    // if (isLoading) return <LoadingSpinner />;
    return (
        <>
            <div className={clsx("absolute bottom-2 left-2 z-[999]")}>
                <button className={clsx("sticky bottom-2 w-full rounded-full bg-dark p-4 shadow-sm shadow-indigo-600 transition-[width] small:hidden", { "w-60 rounded-sm ": isExpanded })} onClick={() => setIsExpanded(prev => !prev)}>
                    {isExpanded ? (
                        <div className="flex items-center justify-center gap-2">
                            <AiOutlineClose className="text-2xl text-secondary" />
                            Zamknij
                        </div>
                    ) : (
                        <FiFilter className="text-4xl text-secondary" />
                    )}
                </button>
            </div>
            <div className={clsx("group relative block shrink-0 bg-primary shadow-md shadow-black transition-all hover:w-64 hover:transition-all", { "w-64": isExpanded, "hidden w-[72px] small:block": !isExpanded })}>
                <div className={clsx("flex h-12 items-center overflow-hidden")}>
                    <FiFilter className="ml-5 shrink-0 text-3xl" />
                    <p className="ml-6 overflow-hidden whitespace-nowrap font-bold">Filtruj typ miejsca</p>
                </div>
                <div
                    className={clsx("absolute -left-1 flex h-16 w-1 translate-y-12 flex-col justify-center rounded-r-md bg-indigo-600  transition-all", { hidden: indicatorPosition === null })}
                    style={{
                        top: `${(indicatorPosition ? indicatorPosition : 0) * 4}rem`
                    }}
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
                                <span className={clsx(" whitespace-nowrap text-base ", { visible: isExpanded, "invisible group-hover:visible": !isExpanded })}>{place.title}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default PlaceTypeFilter;
