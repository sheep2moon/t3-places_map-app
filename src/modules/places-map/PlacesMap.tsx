import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { trpc } from "../../utils/trpc";
import { usePlacesMapStore } from "../../zustand/placesMapStore";
import PlaceMarker from "../map/PlaceMarker";

// type PlacesMapProps = {
//     selectedTypeId: string;
// };

const PlacesMap = () => {
    const { selectedTypeId } = usePlacesMapStore(state => state);
    const places = trpc.useQuery(["places.getPlaces", { placeTypeId: selectedTypeId }]);
    return (
        <div className="relative mx-auto my-2 aspect-square w-full">
            <MapContainer center={[52.09, 19.09]} zoom={6}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {places.data && places.data.map(place => <PlaceMarker key={place.id} place={place} />)}
                {/* <ZoomHandler /> */}
            </MapContainer>
        </div>
    );
};

export default PlacesMap;

const ZoomHandler = () => {
    const { isPlaceModalOpen, currentPlaceId } = usePlacesMapStore(state => state);
    const { data, isLoading } = trpc.useQuery(["places.getPlaceDetails", { placeId: currentPlaceId }]);
    const map = useMap();
    useEffect(() => {
        if (isPlaceModalOpen && data) {
            map.flyTo({ lat: data.lat, lng: data.lng });
        }
    }, [isPlaceModalOpen, currentPlaceId, isLoading]);
    return <></>;
};
