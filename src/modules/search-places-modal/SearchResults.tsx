import { Place } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { BsArrowRightSquareFill } from "react-icons/bs";
import { getPlaceImageSrc } from "../../utils/getImageSrc";
import { trpc } from "../../utils/trpc";
import { usePlacesMapStore } from "../../zustand/placesMapStore";
import RatingBadge from "../common/badges/RatingBadge";
import LoadingSpinner from "../common/LoadingSpinner";
import PlaceTypeIcon from "../place/PlaceTypeIcon";

type SearchResultsProps = {
    query: string;
    close: () => void;
};

const SearchResults = ({ query, close }: SearchResultsProps) => {
    const searchResults = trpc.useQuery(["places.getFilteredPlaces", { query }]);
    const { setCurrentPlaceId, setIsPlaceModalOpen, setFlyTo } = usePlacesMapStore(store => store);
    const router = useRouter();

    const handleGoToPlace = (place: Place) => {
        setCurrentPlaceId(place.id);
        setIsPlaceModalOpen(true);
        setFlyTo({ lat: place.lat, lng: place.lng });
        close();
        router.push("/places-map");
    };

    if (searchResults.isLoading) return <LoadingSpinner />;
    return (
        <div className="mt-4 flex w-full flex-col items-start">
            {query && query.length > 2 && searchResults.data && searchResults.data.length === 0 && <span>Brak wyników</span>}
            {searchResults.data?.map(result => (
                <button onClick={() => handleGoToPlace(result)} key={result.id} className="flex w-full  rounded-sm p-2 dark:bg-black/30">
                    <div className="relative my-auto aspect-square h-16 small:h-20">
                        <Image fill alt="podgląd miejsca" src={getPlaceImageSrc(result.images[0]?.id || "")} />
                    </div>
                    <div className="ml-2 flex flex-col items-start small:ml-4 ">
                        <div className="flex items-center gap-2">
                            <span className="text-left text-lg small:text-2xl">{result.displayName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <PlaceTypeIcon size="sm" placeType={result.type} />
                            {result.isPaid ? <span className="text-rose-400">Płatne $</span> : <span className="text-emerald-400">Darmowe</span>}
                        </div>
                        <div className="flex items-center gap-1">
                            <span>Ocena</span>
                            <RatingBadge reviews={result.reviews} />
                            <span className="ml-2">({result.reviews.length} ocen)</span>
                        </div>
                    </div>
                    <div className="my-auto ml-auto pr-2 small:pr-4">
                        <BsArrowRightSquareFill className="text-3xl small:text-5xl" />
                    </div>
                </button>
            ))}
        </div>
    );
};

export default SearchResults;
