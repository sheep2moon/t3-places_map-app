import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { trpc } from "../../utils/trpc";
import { usePlacesMapStore } from "../../zustand/placesMapStore";
import PlaceMarker from "../map/PlaceMarker";

// type PlacesMapProps = {
//     selectedTypeId: string;
// };

const PlacesMap = () => {
    const { selectedTypeId, currentPlaceId, shouldFly, isPlaceModalOpen } = usePlacesMapStore(state => state);
    const places = trpc.useQuery(["places.getPlaces", { placeTypeId: selectedTypeId }]);
    return (
        <div className="max-h-container-screen relative h-full w-full max-w-screen-large">
            <MapContainer center={[52.09, 19.09]} zoom={6}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {places.data && places.data.map(place => <PlaceMarker key={place.id} place={place} />)}
                {currentPlaceId && isPlaceModalOpen && shouldFly && <FlyHandler currentPlaceId={currentPlaceId} />}
            </MapContainer>
        </div>
    );
};

export default PlacesMap;

const FlyHandler = ({ currentPlaceId }: { currentPlaceId: string }) => {
    const { setShouldFly } = usePlacesMapStore(state => state);
    const { data, isLoading } = trpc.useQuery(["places.getPlaceDetails", { placeId: currentPlaceId }]);
    const map = useMap();
    useEffect(() => {
        if (!isLoading && data) {
            map.flyTo({ lat: data.lat, lng: data.lng });
            setShouldFly(false);
        }
    }, [currentPlaceId, data, isLoading]);
    return <></>;
};
