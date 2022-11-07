import Link from "next/link";
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
                {userPlaces.data?.length === 0 && (
                    <div className="flex items-center gap-2">
                        <span>Nie dodałeś jeszcze żadnych miejsc</span>
                        <Link href="/add-place">
                            <a className="rounded-sm bg-amber-200 p-1 text-primary">Dodaj miejsce</a>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserPlaces;
