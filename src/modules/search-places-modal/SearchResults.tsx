import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";
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
    const { setCurrentPlaceId, setIsPlaceModalOpen, setShouldFly } = usePlacesMapStore(store => store);
    const router = useRouter();

    const handleGoToPlace = (placeId: string) => {
        setCurrentPlaceId(placeId);
        setIsPlaceModalOpen(true);
        setShouldFly(true);
        close();
        router.push("/places-map");
    };

    if (searchResults.isLoading) return <LoadingSpinner />;
    return (
        <div className="mt-4 flex flex-col items-start">
            {searchResults.data?.map(result => (
                <div key={result.id} className="flex w-full  rounded-sm p-2 dark:bg-black/30">
                    <div className="relative my-auto aspect-square h-16 small:h-20">
                        <Image layout="fill" alt="podgląd miejsca" src={getPlaceImageSrc(result.images[0]?.id || "")} />
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
                    <button onClick={() => handleGoToPlace(result.id)} className="my-auto ml-auto pr-2 small:pr-4">
                        <AiOutlineRight className="text-2xl small:text-4xl" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SearchResults;