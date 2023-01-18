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
                <RadioGroup.Label className=" text-left text-lg small:text-xl">Typ miejsca: {selectedPlaceTypeTitle || "dowolne"}</RadioGroup.Label>
                <div className="flex gap-2">
                    <RadioGroup.Option value="">
                        {({ checked }) => (
                            <div className={clsx("flex  items-center justify-center rounded-full p-1", { " bg-secondary": checked })}>
                                <BiDotsHorizontalRounded className="h-14 w-14 rounded-full bg-light  text-dark" />
                            </div>
                        )}
                    </RadioGroup.Option>
                    {placeTypes.data.map(placeType => (
                        <RadioGroup.Option value={placeType.title} key={placeType.id}>
                            {({ checked }) => (
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

export default SearchPlaceTypeSelect;
