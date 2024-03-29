import { PlaceType } from "@prisma/client";
import Link from "next/link";
import React from "react";
import HorizontalLine from "../../common/HorizontalLine";
import PlaceTypeIcon from "../../place/PlaceTypeIcon";

type PlaceTypesListProps = {
    placeTypes: PlaceType[];
};

const PlaceTypesList = ({ placeTypes }: PlaceTypesListProps) => {
    // const { data, isLoading } = trpc.useQuery(["places.getPlaceTypes"]);

    return (
        <div className="mx-auto mt-8 flex flex-col items-center">
            <HorizontalLine>
                <h2 className="text-lg font-extralight md:text-xl lg:text-2xl">Jakiego miejsca szukasz?</h2>
            </HorizontalLine>
            <div className="mt-8 flex gap-1 3xsmall:gap-2  xsmall:gap-4 small:gap-8">
                {/* {isLoading && (
                    <div className="relative h-[148px]  w-full">
                        <LoadingSpinner />
                    </div>
                )} */}
                {placeTypes.map(placeType => (
                    <Link href={`/places-map?typeId=${placeType.id}`} key={placeType.id} className="flex w-16 flex-col items-center gap-1 2xsmall:w-20 xsmall:w-24 small:w-32 small:gap-2">
                        <PlaceTypeIcon placeType={placeType} size="lg" />
                        <div className="flex h-16 items-center">
                            <p className="text-center text-xs 3xsmall:text-sm xsmall:text-lg small:text-xl">{placeType.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
            {/* <HorizontalLine /> */}
        </div>
    );
};

export default PlaceTypesList;
