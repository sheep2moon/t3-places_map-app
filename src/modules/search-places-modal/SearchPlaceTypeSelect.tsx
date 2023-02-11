import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { trpc } from "../../utils/trpc";
import LoadingSpinner from "../common/LoadingSpinner";
import PlaceTypeIcon from "../place/PlaceTypeIcon";

type PlaceTypeSelectProps = {
    selectedPlaceTypeTitle: string;
    setSelectedPlaceTypeTitle: (s: string) => void;
};

const SearchPlaceTypeSelect = ({ selectedPlaceTypeTitle, setSelectedPlaceTypeTitle }: PlaceTypeSelectProps) => {
    const placeTypes = trpc.useQuery(["places.getPlaceTypes"]);

    if (placeTypes.isLoading || !placeTypes.data) return <LoadingSpinner />;
    return (
        <RadioGroup value={selectedPlaceTypeTitle} onChange={setSelectedPlaceTypeTitle}>
            <div className="flex flex-col gap-2">
                <RadioGroup.Label className=" text-left text-lg small:text-xl">Typ miejsca</RadioGroup.Label>
                <div className="flex gap-2">
                    <RadioGroup.Option value="">
                        {({ checked }) => (
                            <div className={clsx("flex w-20 flex-col items-center rounded-md p-1", { "bg-light/10 shadow-md shadow-black dark:text-secondary": checked })}>
                                <div className="flex  items-center justify-center rounded-full">
                                    <BiDotsHorizontalRounded className="h-14 w-14 rounded-full bg-light  text-dark" />
                                </div>
                                <span>Wszystko</span>
                            </div>
                        )}
                    </RadioGroup.Option>
                    {placeTypes.data.map(placeType => (
                        <RadioGroup.Option value={placeType.title} key={placeType.id}>
                            {({ checked }) => (
                                <div className={clsx("flex w-24 flex-col items-center rounded-md p-1", { " bg-light/10 shadow-md shadow-black dark:text-secondary": checked })}>
                                    <PlaceTypeIcon placeType={placeType} size="md" />
                                    <span className="line-clamp-2">{placeType.title}</span>
                                </div>
                            )}
                        </RadioGroup.Option>
                    ))}
                </div>
            </div>
        </RadioGroup>
    );
};

export default SearchPlaceTypeSelect;
