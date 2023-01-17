import { Dialog, Menu, RadioGroup, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { ImSearch } from "react-icons/im";
import useDebounce from "../../../../lib/hooks/useDebounce";
import { trpc } from "../../../../utils/trpc";
import Button from "../../../common/Button";
import Modal from "../../../common/Modal";
import { MdClose } from "react-icons/md";
import LoadingSpinner from "../../../common/LoadingSpinner";
import PlaceTypeBadge from "../../../common/badges/PlaceTypeBadge";
import PlaceTypeIcon from "../../../place/PlaceTypeIcon";
import clsx from "clsx";

const PlacesSearch = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlaceTypeTitle, setSelectedPlaceTypeTitle] = useState("");

    const [searchQuery, setSearchQuery] = useState("");
    const debouncedQuery = useDebounce(searchQuery, 500);
    const [isResultsVisible, setIsResultsVisible] = useState(false);
    const searchResults = trpc.useQuery(["places.getFilteredPlaces", { query: debouncedQuery }]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // const handleInputFocus = () => {
    //     setIsResultsVisible(true);
    // };

    // const handleInputBlur = () => {
    //     setIsResultsVisible(false);
    // };

    const close = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button className="ml-auto p-1" onClick={() => setIsModalOpen(true)}>
                <ImSearch className="text-xl" />
            </button>
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={close}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-light bg-opacity-50 dark:bg-black/50" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className=" flex h-full w-full items-center justify-center pt-16 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="flex h-full w-full flex-col bg-light p-2 transition-all dark:bg-dark small:p-6">
                                    <div className="mx-auto w-full max-w-5xl">
                                        <div className="flex justify-between ">
                                            <PlaceTypeSelect selectedPlaceTypeTitle={selectedPlaceTypeTitle} setSelectedPlaceTypeTitle={setSelectedPlaceTypeTitle} />
                                            <button onClick={close} className="mb-2 ml-auto text-7xl text-secondary">
                                                <MdClose />
                                            </button>
                                        </div>
                                        <div className="mx-auto mt-2 flex items-center">
                                            <input onChange={handleChange} type="text" className="w-full border-b-4 border-secondary bg-transparent p-2 text-4xl text-secondary" placeholder="Wyszukaj..." />
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
        // <div className="relative ml-auto max-w-md small:w-full">
        //     <div className="flex h-12 items-center rounded-md bg-dark px-2 shadow-md shadow-black/40 ">
        //         <ImSearch className="mr-2 text-xl" />
        //         <input onFocus={handleInputFocus} onBlur={handleInputBlur} className="h-10 w-full rounded-md bg-primary px-2" type="text" onChange={handleChange} value={searchQuery} />
        //     </div>

        //     <div className="absolute top-12">
        //         <ul className="flex flex-col border border-black/60 dark:bg-primary">
        //             {isResultsVisible &&
        //                 searchResults.data &&
        //                 searchResults.data.map(place => (
        //                     <li className="px-1 py-1.5" key={place.id}>
        //                         {place.displayName}
        //                     </li>
        //                 ))}
        //         </ul>
        //     </div>
        // </div>
    );
};

export default PlacesSearch;

type PlaceTypeSelectProps = {
    selectedPlaceTypeTitle: string;
    setSelectedPlaceTypeTitle: (s: string) => void;
};

const PlaceTypeSelect = ({ selectedPlaceTypeTitle, setSelectedPlaceTypeTitle }: PlaceTypeSelectProps) => {
    const placeTypes = trpc.useQuery(["places.getPlaceTypes"]);

    if (placeTypes.isLoading || !placeTypes.data) return <LoadingSpinner />;
    return (
        <RadioGroup value={selectedPlaceTypeTitle} onChange={setSelectedPlaceTypeTitle}>
            <div className="flex flex-col gap-2">
                <RadioGroup.Label className=" text-xl">Typ miejsca: {selectedPlaceTypeTitle}</RadioGroup.Label>
                <div className="flex gap-2">
                    {placeTypes.data.map(placeType => (
                        <RadioGroup.Option value={placeType.title} key={placeType.id}>
                            {({ active, checked }) => (
                                <div className={clsx("rounded-full p-1", { "bg-secondary": checked })}>
                                    <PlaceTypeIcon placeType={placeType} size="md" />
                                </div>
                            )}
                        </RadioGroup.Option>
                    ))}
                </div>
            </div>
        </RadioGroup>
    );
};
