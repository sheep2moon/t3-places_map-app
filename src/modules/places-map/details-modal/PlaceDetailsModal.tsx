import React from "react";
import { trpc } from "../../../utils/trpc";
import { MdPlace } from "react-icons/md";
import { usePlacesMapStore } from "../../../zustand/placesMapStore";
import LoadingSpinner from "../../common/LoadingSpinner";
import AddReview from "./reviews/AddReview";
import ImageGallery from "./ImageGallery";
import OwnerReview from "./reviews/EditReview";
import Reviews from "./reviews/Reviews";
import TimeBadge from "../../common/badges/TimeBadge";
import UserBadge from "../../common/badges/UserBadge";
import PlaceTypeBadge from "../../common/badges/PlaceTypeBadge";
import HorizontalLine from "../../common/HorizontalLine";
import ModalContainer from "./ModalContainer";
import UserActions from "./UserActions";
import AddOrEditReview from "./reviews/AddOrEditReview";

const PlaceDetailsModal = () => {
    const { currentPlaceId, showPlaceModal, setShowPlaceModal } = usePlacesMapStore(state => state);
    const userDetailsQuery = trpc.useQuery(["user.getUserDetails"]);
    const { data, isLoading } = trpc.useQuery(["places.getPlaceDetails", { placeId: currentPlaceId }]);

    if (isLoading || userDetailsQuery.isLoading || !data) return <LoadingSpinner />;

    return (
        <div className=" z-[99] ">
            <ModalContainer isModalOpen={showPlaceModal} close={() => setShowPlaceModal(false)}>
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
                            <div className=" flex items-center justify-between text-lg font-bold">{data?.type && <PlaceTypeBadge placeType={data.type} />}</div>
                        </div>
                        <HorizontalLine />
                        <div className="flex items-center">
                            <MdPlace className="text-lg text-amber-600 " />
                            <span className="overflow-hidden text-ellipsis whitespace-nowrap">{data?.displayName}</span>
                        </div>
                        <div className="flex flex-col text-xs">
                            <div className="mb-2 flex gap-1"></div>
                            <pre className="whitespace-pre-wrap text-left font-mono">{data?.description}</pre>
                        </div>
                    </div>
                    {data?.images && <ImageGallery images={data?.images} />}
                    <HorizontalLine />
                    <UserActions placeId={currentPlaceId} />
                    <AddOrEditReview placeId={currentPlaceId} />
                    <Reviews placeId={currentPlaceId} />
                </div>
            </ModalContainer>
        </div>
    );
};

export default PlaceDetailsModal;
