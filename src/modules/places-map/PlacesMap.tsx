import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { trpc } from "../../utils/trpc";
import { usePlacesMapStore } from "../../zustand/placesMapStore";
import LoadingSpinner from "../common/LoadingSpinner";
import PlaceMarker from "../map/PlaceMarker";
import PlaceTypeFilter from "./PlaceTypeFilter";

// type PlacesMapProps = {
//     selectedTypeId: string;
// };

const PlacesMap = () => {
    const { selectedTypeId } = usePlacesMapStore(state => state);
    const places = trpc.useQuery(["places.getPlaces", { placeTypeId: selectedTypeId }]);

    return (
        <MapContainer center={[52.09, 19.09]} zoom={6}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {places.isLoading && (
                <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center ">
                    <div className="relative">
                        <LoadingSpinner />
                    </div>
                    <p className="mt-8 rounded-md bg-white/40  text-xl font-bold text-dark">Wczytuje punkty...</p>
                </div>
            )}
            {places.data && places.data.map(place => <PlaceMarker key={place.id} place={place} />)}
            <FlyHandler />
        </MapContainer>
    );
};

export default PlacesMap;

const FlyHandler = () => {
    const { flyTo, setFlyTo } = usePlacesMapStore(state => state);
    const map = useMap();
    useEffect(() => {
        if (flyTo) {
            map.flyTo({ lat: flyTo.lat, lng: flyTo.lng }, 12);
            setFlyTo(null);
        }
    }, [flyTo, setFlyTo, map]);
    return null;
};
