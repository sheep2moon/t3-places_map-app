import React, { useEffect } from "react";
import { trpc } from "../../../utils/trpc";
import { MdPlace } from "react-icons/md";
import { usePlacesMapStore } from "../../../zustand/placesMapStore";
import LoadingSpinner from "../../common/LoadingSpinner";
import Modal from "../../common/Modal";
import PlaceTypeIcon from "../../place/PlaceTypeIcon";
import AddReview from "./AddReview";
import ImageGallery from "./ImageGallery";
import OwnerReview from "./OwnerReview";
import Reviews from "./Reviews";
import UserAvatar from "../../common/UserAvatar";
import TimeBadge from "../../common/badges/TimeBadge";
import UserBadge from "../../common/badges/UserBadge";
import PlaceTypeBadge from "../../common/badges/PlaceTypeBadge";
import HorizontalLine from "../../common/HorizontalLine";
import ModalContainer from "./ModalContainer";

const PlaceDetailsModal = () => {
    const { currentPlaceId, showPlaceModal, setShowPlaceModal } = usePlacesMapStore(state => state);
    const userReviewQuery = trpc.useQuery(["protectedPlace.getUserReview", { placeId: currentPlaceId }]);
    const { data, isLoading } = trpc.useQuery(["places.getPlaceDetails", { placeId: currentPlaceId }]);

    if (isLoading || userReviewQuery.isLoading || !data) return <LoadingSpinner />;

    return (
        <div className=" z-[99] ">
            <ModalContainer isModalOpen={showPlaceModal} close={() => setShowPlaceModal(false)}>
                <div>
                    <div className="flex flex-col text-primary dark:text-light">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <span className="text-xs">Dodane przez:</span>
                                <UserBadge user={data?.addedBy} />
                            </div>
                            <div className="flex items-center justify-center">
                                <TimeBadge>
                                    <span className="flex gap-1">{data?.createdAt.toLocaleString()}</span>
                                </TimeBadge>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-lg font-bold">
                            <div className="flex items-center">
                                <MdPlace className="text-amber-600" />
                                {data?.displayName}
                            </div>
                            {data?.type && <PlaceTypeBadge placeType={data.type} />}
                        </div>
                        <div className="flex flex-col text-xs">
                            <div className="mb-2 flex gap-1"></div>
                            <p>{data?.description}</p>
                        </div>
                    </div>
                    {data?.images && <ImageGallery images={data?.images} />}
                    <HorizontalLine />
                    {userReviewQuery.data ? <OwnerReview review={userReviewQuery.data} /> : <AddReview placeId={currentPlaceId} />}
                    <Reviews placeId={currentPlaceId} />
                </div>
            </ModalContainer>
        </div>
    );
};

export default PlaceDetailsModal;
