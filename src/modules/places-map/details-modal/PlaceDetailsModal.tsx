import React, { useEffect } from "react";
import { trpc } from "../../../utils/trpc";
import { usePlacesMapStore } from "../../../zustand/placesMapStore";
import LoadingSpinner from "../../common/LoadingSpinner";
import Modal from "../../common/Modal";
import PlaceTypeIcon from "../../place/PlaceTypeIcon";
import AddReview from "./AddReview";
import ImageGallery from "./ImageGallery";

const PlaceDetailsModal = () => {
    const { currentPlaceId, showPlaceModal, setShowPlaceModal } = usePlacesMapStore(state => state);
    const { data, isLoading } = trpc.useQuery(["places.getPlaceDetails", { placeId: currentPlaceId }]);

    // useEffect(() => {
    //     console.log(data, isLoading, showPlaceModal);
    // }, [data, isLoading, showPlaceModal]);
    if (isLoading && !data) return <LoadingSpinner />;

    return (
        <div className=" z-[99] ">
            <Modal isModalOpen={showPlaceModal} close={() => setShowPlaceModal(false)}>
                <div>
                    <div className="flex flex-col items-center bg-secondary p-1 pt-4 text-primary">
                        <span className="text-lg font-bold">{data?.displayName}</span>
                        <p>{data?.description}</p>

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
                    {data?.id && <AddReview placeId={data.id} />}
                </div>
            </Modal>
        </div>
    );
};

export default PlaceDetailsModal;
