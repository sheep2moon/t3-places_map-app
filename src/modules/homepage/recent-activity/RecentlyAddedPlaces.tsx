import { Image as ImageType, Place, PlaceType } from "@prisma/client";
import React from "react";
import HorizontalLine from "../../common/HorizontalLine";
import PlaceCard from "../../place/PlaceCard";

type RecentlyAddedPlacesProps = {
    recentlyAddedPlaces: (Place & { type: PlaceType; images: ImageType[] })[];
};

const RecentlyAddedPlaces = ({ recentlyAddedPlaces }: RecentlyAddedPlacesProps) => {
    // const { data, isLoading } = trpc.useQuery(["places.getRecentlyAddedPlaces"]);

    return (
        <div className="mt-8 flex flex-col py-4 ">
            <HorizontalLine>
                <h2 className="text-lg font-extralight md:text-xl lg:text-2xl">Ostatnio dodane miejsca</h2>
            </HorizontalLine>
            {/* {isLoading && <LoadingSkeleton />} */}
            <div className="mt-4 grid h-full w-full gap-2 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {recentlyAddedPlaces.map(place => (
                    <PlaceCard place={place} key={place.id} />
                ))}
            </div>
        </div>
    );
};

export default RecentlyAddedPlaces;

{
    /* <div key={place.id} className="relative h-48 w-full min-w-[220px] max-w-md rounded-md text-light shadow-md shadow-black/30 dark:shadow-black/60">
                        {place.images[0] && <Image className="rounded-md object-cover" alt="" src={getPlaceImageSrc(place.images[0].id)} fill />}
                        <div className="absolute inset-0 z-10 flex w-full flex-col justify-between rounded-md p-2 dark:bg-black/60 ">
                            <p className="bg-dark/60 text-center text-lg dark:bg-transparent  ">{place.displayName}</p>
                            <div className="flex items-center justify-between bg-dark/60 dark:bg-transparent">
                                <PlaceTypeBadge placeType={place.type} size="sm" />
                                <Button onClick={() => handleViewPlace(place)} variant="outline" className="text-base">
                                    Zobacz
                                </Button>
                            </div>
                        </div>
                    </div> */
}
