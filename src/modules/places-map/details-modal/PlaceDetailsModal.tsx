import React from "react";
import googleMapsIcon from "../../../assets/google-maps.png";
import { trpc } from "../../../utils/trpc";
import { MdPlace } from "react-icons/md";
import { usePlacesMapStore } from "../../../zustand/placesMapStore";
import LoadingSpinner from "../../common/LoadingSpinner";
import ImageGallery from "./ImageGallery";
import Reviews from "./reviews/Reviews";
import TimeBadge from "../../common/badges/TimeBadge";
import UserBadge from "../../common/badges/UserBadge";
import PlaceTypeBadge from "../../common/badges/PlaceTypeBadge";
import HorizontalLine from "../../common/HorizontalLine";
import ModalContainer from "./ModalContainer";
import UserActions from "./UserActions";
import AddOrEditReview from "./reviews/AddOrEditReview";
import Image from "next/image";
import PlacePricing from "./PlacePricing";

const PlaceDetailsModal = () => {
    const { currentPlaceId, isPlaceModalOpen, setIsPlaceModalOpen } = usePlacesMapStore(state => state);
    const { data, isLoading } = trpc.useQuery(["places.getPlaceDetails", { placeId: currentPlaceId }]);

    if (isLoading || !data) return <LoadingSpinner />;

    const handleCloseModal = () => {
        setIsPlaceModalOpen(false);
    };

    return (
        <div className=" z-[99] ">
            <ModalContainer isModalOpen={isPlaceModalOpen} close={handleCloseModal}>
                <div className="w-full">
                    <div className="flex flex-col text-primary dark:text-light">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    <span className="text-2xs">Dodane przez:</span>
                                    <UserBadge user={data?.addedBy} />
                                </div>
                                <div className="flex items-center">
                                    <TimeBadge>
                                        <span className="flex gap-1">{data?.createdAt.toLocaleString()}</span>
                                    </TimeBadge>
                                </div>
                            </div>
                            <div className=" flex items-center justify-between text-lg font-bold">{data?.type && <PlaceTypeBadge size="sm" placeType={data.type} />}</div>
                        </div>
                        <HorizontalLine />
                        <div className="flex items-center">
                            <MdPlace className="text-lg text-amber-600 " />
                            <span className="overflow-hidden text-ellipsis whitespace-nowrap">{data?.displayName}</span>
                        </div>
                        <div className="flex flex-col text-xs">
                            <div className="mb-2 flex gap-1"></div>
                            <pre className="whitespace-pre-wrap text-left font-mono text-lg">{data?.description}</pre>
                        </div>
                        {data.prices && <PlacePricing prices={JSON.parse(data.prices)} />}
                    </div>
                    {data?.images && <ImageGallery images={data?.images} />}
                    <HorizontalLine />

                    <a
                        className="flex w-fit items-center gap-2 rounded-md border border-secondary py-1 px-2 hover:bg-dark dark:bg-primary"
                        target="_blank"
                        rel="noreferrer"
                        href={`http://maps.google.com/maps?z=12&t=m&q=loc:${data.lat}+${data.lng}`}
                    >
                        <Image alt="ikona map google" src={googleMapsIcon} width={32} height={32} />
                        <span className="font-bold">Otwórz w mapach Google</span>
                    </a>
                    {/* <HorizontalLine /> */}
                    <UserActions placeId={currentPlaceId} />
                    <AddOrEditReview placeId={currentPlaceId} />
                    <Reviews placeId={currentPlaceId} />
                </div>
            </ModalContainer>
        </div>
    );
};

export default PlaceDetailsModal;
