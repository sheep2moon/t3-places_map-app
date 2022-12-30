import { Place } from "@prisma/client";
import React from "react";
import { Query, UseQueryResult } from "react-query";
import LoadingSpinner from "../../common/LoadingSpinner";

type RecentlyAddedPlacesProps = {
    queryResult: UseQueryResult<Place[]>;
};

const RecentlyAddedPlaces = ({ queryResult }: RecentlyAddedPlacesProps) => {
    if (queryResult.isLoading) return <LoadingSpinner />;

    return (
        <div className="grid w-full grid-cols-3">
            {queryResult.data?.map(place => (
                <div key={place.id} className="h-44">
                    <span>{place.displayName}</span>
                </div>
            ))}
        </div>
    );
};

export default RecentlyAddedPlaces;
