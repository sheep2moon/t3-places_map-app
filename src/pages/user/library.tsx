import { Place, PlaceType } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import { IoWalk } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import { BiShowAlt } from "react-icons/bi";
import LoadingSpinner from "../../modules/common/LoadingSpinner";
import PlaceTypeIcon from "../../modules/place/PlaceTypeIcon";
import { trpc } from "../../utils/trpc";
import { usePlacesMapStore } from "../../zustand/placesMapStore";

const UserLibrary = () => {
    const { data, isLoading } = trpc.useQuery(["user.getUserLibrary"]);
    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="h-container-screen mx-auto w-full max-w-screen-sm py-2">
            <div className="py-1/2 mt-4 flex items-center gap-1 rounded-sm bg-white/80 px-1 dark:bg-black/20">
                <MdFavorite className="text-lg text-secondary" />
                Ulubione
            </div>
            <div className="mt-2">
                {data?.wishlist.length === 0 && <span className="ml-4 text-xs">Brak ulubionych miejsc</span>}
                {data?.wishlist.map(place => (
                    <LibraryPlace key={place.id} place={place} />
                ))}
            </div>
            <div className="py-1/2 mt-4 flex items-center gap-1 rounded-sm bg-white/80 px-1 dark:bg-black/20">
                <IoWalk className="text-lg text-secondary" />
                Odwiedzone
            </div>
            <div className="mt-2">
                {data?.visited.length === 0 && <span className="ml-4 text-xs">Brak miejsc które chcesz odwiedzić</span>}
                {data?.visited.map(place => (
                    <LibraryPlace key={place.id} place={place} />
                ))}
            </div>
        </div>
    );
};

export default UserLibrary;

const LibraryPlace = ({ place }: { place: Place & { type: PlaceType } }) => {
    const { setCurrentPlaceId, setIsPlaceModalOpen } = usePlacesMapStore(state => state);
    const router = useRouter();

    const handleGoToPlace = () => {
        setCurrentPlaceId(place.id);
        setIsPlaceModalOpen(true);
        router.push("/places-map");
    };

    return (
        <div className="flex items-center gap-2 rounded-sm py-1 pr-1 ">
            <div>
                <PlaceTypeIcon size="sm" placeType={place.type} />
            </div>
            <span>{place.displayName}</span>
            <button onClick={handleGoToPlace} className="ml-auto flex items-center gap-2 rounded-sm p-2 hover:bg-primary/5 dark:text-amber-200 dark:hover:bg-light/5">
                <span className="text-xs dark:text-amber-100">Mapa</span>
                <BiShowAlt />
            </button>
        </div>
    );
};
