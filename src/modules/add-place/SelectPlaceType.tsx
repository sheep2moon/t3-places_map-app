import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { trpc } from "../../utils/trpc";
import { useNewPlaceStore } from "../../zustand/newPlaceStore";
import LoadingSpinner from "../common/LoadingSpinner";
import PlaceType from "../place/PlaceType";

const SelectPlaceType = () => {
    const { data, isLoading } = trpc.useQuery(["places.getPlaceTypes"]);
    const { placeTypeId, setPlaceTypeId } = useNewPlaceStore(state => state);
    if (isLoading) return <LoadingSpinner />;
    return (
        <div className="mt-4">
            <span className="mb-2 block">Typ miejsca</span>
            <div className="flex gap-1">
                {data?.map(placeType => (
                    <div key={placeType.id} className={clsx("transition-all", { "border border-slate-200 bg-slate-400/20": placeTypeId === placeType.id })} onClick={() => setPlaceTypeId(placeType.id)}>
                        <PlaceType placeType={placeType} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectPlaceType;
