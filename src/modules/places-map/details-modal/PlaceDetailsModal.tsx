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

const PlaceDetailsModal = () => {
    const { currentPlaceId, showPlaceModal, setShowPlaceModal } = usePlacesMapStore(state => state);
    const userReviewQuery = trpc.useQuery(["protectedPlace.getUserReview", { placeId: currentPlaceId }]);
    const { data, isLoading } = trpc.useQuery(["places.getPlaceDetails", { placeId: currentPlaceId }]);

    if (isLoading || userReviewQuery.isLoading || !data) return <LoadingSpinner />;

    return (
        <div className=" z-[99] ">
            <Modal isModalOpen={showPlaceModal} close={() => setShowPlaceModal(false)}>
                <div>
                    <div className="flex flex-col text-primary">
                        <div className="flex items-center text-lg font-bold">
                            <MdPlace className="text-amber-600" />
                            {data?.displayName}
                        </div>
                        <div className="flex flex-col text-xs">
                            <div className="mb-2 flex gap-1">
                                <span>Dodane przez </span>
                                <div className=" flex items-center gap-1">
                                    {/* <UserAvatar image={data?.addedBy.image ?? ""} size={4} /> */}
                                    <span className="text-primary/80 underline">{data?.addedBy.name}</span>
                                </div>
                                <span>dnia</span>
                                <span>{data?.createdAt.toLocaleString()}</span>
                            </div>
                            <p>{data?.description}</p>
                        </div>

                        {data?.type && (
                            <div className="mt-4 flex items-center">
                                <span>
                                    <PlaceTypeIcon size="sm" placeType={data?.type} />
                                </span>
                                <span>{data.type.title}</span>
                            </div>
                        )}
                    </div>
                    {data?.images && <ImageGallery images={data?.images} />}
                    <div className="mt-4 h-1 rounded-md bg-secondary/60 shadow-sm shadow-violet-700/40"></div>
                    {userReviewQuery.data ? <OwnerReview review={userReviewQuery.data} /> : <AddReview placeId={currentPlaceId} />}
                    <Reviews placeId={currentPlaceId} />
                </div>
            </Modal>
        </div>
    );
};

export default PlaceDetailsModal;
