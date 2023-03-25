import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import useDebounce from "../../lib/hooks/useDebounce";
import SearchModalContainer from "./SearchModalContainer";
import SearchResults from "./SearchResults";

const PlacesSearch = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedQuery = useDebounce(searchQuery, 500);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };
    const close = () => {
        setIsModalOpen(false);
        setSearchQuery("");
    };

    return (
        <div className="ml-auto">
            <button aria-label="Wyszukaj miejsca" className="ml-auto p-1" onClick={() => setIsModalOpen(true)}>
                <ImSearch className="text-xl" />
            </button>
            <SearchModalContainer close={close} isModalOpen={isModalOpen}>
                <div className="mx-auto w-full max-w-3xl rounded-lg bg-light p-4 shadow-md shadow-dark/60 dark:bg-dark dark:shadow-black small:min-w-[800px]">
                    <div className="mx-auto mt-2 flex items-center">
                        <input autoFocus onChange={handleChange} type="text" className="w-full border-b-2 border-secondary bg-transparent p-2 text-4xl text-secondary outline-none " placeholder="Wyszukaj..." />
                    </div>
                    <SearchResults close={close} query={debouncedQuery} />
                </div>
            </SearchModalContainer>
        </div>
    );
};

export default PlacesSearch;
