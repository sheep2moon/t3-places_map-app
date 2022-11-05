import React from "react";
import LoadingSpinner from "../../modules/common/LoadingSpinner";
import UserPlace from "../../modules/user-places/UserPlace";
import { trpc } from "../../utils/trpc";

const UserPlaces = () => {
    const userPlaces = trpc.useQuery(["protectedPlace.getUserPlaces"]);
    if (userPlaces.isLoading) return <LoadingSpinner />;
    return (
        <div className="min-h-[400px] w-full">
            <h1 className="mb-4 border-b-2 border-light">Twoje miejsca</h1>
            <div className="flex flex-col gap-2">
                {userPlaces.data?.map(place => (
                    <UserPlace key={place.id} place={place} placeType={place.type} />
                ))}
            </div>
        </div>
    );
};

export default UserPlaces;
