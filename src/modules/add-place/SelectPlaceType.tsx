import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { trpc } from "../../utils/trpc";
import { useNewPlaceStore } from "../../zustand/newPlaceStore";
import LoadingSpinner from "../common/LoadingSpinner";

const SelectPlaceType = () => {
    const { data, isLoading } = trpc.useQuery(["places.getPlaceTypes"]);
    const { placeTypeId, setPlaceTypeId } = useNewPlaceStore(state => state);
    if (isLoading) return <LoadingSpinner />;
    return (
        <div className="mt-4">
            <span className="mb-2 block">Typ miejsca</span>
            <div className="flex">
                {data?.map(place => (
                    <div key={place.id} className={clsx("flex h-20 w-20 flex-col items-center rounded-md p-1 transition-all", { "border border-white bg-slate-400/20": place.id === placeTypeId })} onClick={() => setPlaceTypeId(place.id)}>
                        <div className="relative h-12 w-12">
                            <Image src={place.icon} alt="place thumbnail" layout="fill" />
                        </div>
                        <span className="text-sm">{place.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectPlaceType;
