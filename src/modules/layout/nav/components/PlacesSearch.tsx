import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import useDebounce from "../../../../lib/hooks/useDebounce";
import { trpc } from "../../../../utils/trpc";

const PlacesSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedQuery = useDebounce(searchQuery, 500);
    const [isResultsVisible, setIsResultsVisible] = useState(false);
    const searchResults = trpc.useQuery(["places.getFilteredPlaces", { query: debouncedQuery }]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleInputFocus = () => {
        setIsResultsVisible(true);
    };

    const handleInputBlur = () => {
        setIsResultsVisible(false);
    };

    return (
        <div className="relative ml-auto max-w-md small:w-full">
            <div className="flex h-12 items-center rounded-md bg-dark px-2 shadow-md shadow-black/40 ">
                <ImSearch className="mr-2 text-xl" />
                <input onFocus={handleInputFocus} onBlur={handleInputBlur} className="h-10 w-full rounded-md bg-primary px-2" type="text" onChange={handleChange} value={searchQuery} />
            </div>

            <div className="absolute top-12">
                <ul className="flex flex-col border border-black/60 dark:bg-primary">
                    {isResultsVisible &&
                        searchResults.data &&
                        searchResults.data.map(place => (
                            <li className="px-1 py-1.5" key={place.id}>
                                {place.displayName}
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default PlacesSearch;
