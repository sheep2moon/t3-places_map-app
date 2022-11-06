import React from "react";
import { trpc } from "../../utils/trpc";
import { usePlacesMapStore } from "../../zustand/placesMapStore";
import LoadingSpinner from "../common/LoadingSpinner";
import Modal from "../common/Modal";

const PlaceDetailsModal = () => {
    const { currentPlaceId, showPlaceModal, setShowPlaceModal } = usePlacesMapStore(state => state);
    const { data, isLoading } = trpc.useQuery(["places.getPlaceDetails", { placeId: currentPlaceId }]);

    if (isLoading && !data) return <LoadingSpinner />;

    return (
        <div className="absolute z-[99] h-20 w-20 bg-black">
            <Modal isModalOpen={showPlaceModal} close={() => setShowPlaceModal(false)}>
                <h1>modal</h1>
            </Modal>
        </div>
    );
};

export default PlaceDetailsModal;
