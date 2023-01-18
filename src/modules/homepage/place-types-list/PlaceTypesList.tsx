import React from "react";
import { trpc } from "../../../utils/trpc";
import HorizontalLine from "../../common/HorizontalLine";
import LoadingSpinner from "../../common/LoadingSpinner";
import PlaceTypeIcon from "../../place/PlaceTypeIcon";

const PlaceTypesList = () => {
    const placeTypes = trpc.useQuery(["places.getPlaceTypes"]);

    if (placeTypes.isLoading) return <LoadingSpinner />;

    return (
        <div className="mx-auto mt-8 flex flex-col items-center">
            <HorizontalLine>
                <h2 className="text-lg font-bold md:text-xl lg:text-2xl">Czego poszukujesz?</h2>
            </HorizontalLine>
            <div className="my-8 flex gap-8">
                {placeTypes.data?.map(placeType => (
                    <div key={placeType.id} className=" flex flex-col items-center gap-2">
                        <PlaceTypeIcon placeType={placeType} size="lg" />
                        <p className="text-lg md:text-xl">{placeType.title}</p>
                    </div>
                ))}
            </div>
            {/* <HorizontalLine /> */}
        </div>
    );
};

export default PlaceTypesList;
