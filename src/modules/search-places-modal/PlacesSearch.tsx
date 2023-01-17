import React, { Fragment, useState } from "react";
import { ImSearch } from "react-icons/im";
import useDebounce from "../../lib/hooks/useDebounce";
import { MdClose } from "react-icons/md";
import SearchModalContainer from "./SearchModalContainer";
import SearchResults from "./SearchResults";
import SearchPlaceTypeSelect from "./SearchPlaceTypeSelect";

const PlacesSearch = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlaceTypeTitle, setSelectedPlaceTypeTitle] = useState("");

    const [searchQuery, setSearchQuery] = useState("");
    const debouncedQuery = useDebounce(searchQuery, 500);
    // const [isResultsVisible, setIsResultsVisible] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };
    const close = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button className="ml-auto p-1" onClick={() => setIsModalOpen(true)}>
                <ImSearch className="text-xl" />
            </button>
            <SearchModalContainer close={close} isModalOpen={isModalOpen}>
                <div className="mx-auto w-full max-w-5xl">
                    <div className="flex justify-between ">
                        <SearchPlaceTypeSelect selectedPlaceTypeTitle={selectedPlaceTypeTitle} setSelectedPlaceTypeTitle={setSelectedPlaceTypeTitle} />
                        <button onClick={close} className="mb-2 ml-auto text-7xl text-secondary">
                            <MdClose />
                        </button>
                    </div>
                    <div className="mx-auto mt-2 flex items-center">
                        <input onChange={handleChange} type="text" className="w-full border-b-4 border-secondary bg-transparent p-2 text-4xl text-secondary" placeholder="Wyszukaj..." />
                    </div>
                    <SearchResults close={close} query={debouncedQuery} />
                </div>
            </SearchModalContainer>
        </>
    );
};

export default PlacesSearch;
