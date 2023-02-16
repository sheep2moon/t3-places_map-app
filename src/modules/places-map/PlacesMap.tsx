import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { trpc } from "../../utils/trpc";
import { usePlacesMapStore } from "../../zustand/placesMapStore";
import PlaceMarker from "../map/PlaceMarker";
import PlaceTypeFilter from "./PlaceTypeFilter";

// type PlacesMapProps = {
//     selectedTypeId: string;
// };

const PlacesMap = () => {
    const { selectedTypeId } = usePlacesMapStore(state => state);
    const places = trpc.useQuery(["places.getPlaces", { placeTypeId: selectedTypeId }]);
    return (
        <div className="max-h-container-screen relative flex h-full w-full max-w-screen-large">
            <PlaceTypeFilter />
            <MapContainer center={[52.09, 19.09]} zoom={6}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {places.data && places.data.map(place => <PlaceMarker key={place.id} place={place} />)}
                <FlyHandler />
            </MapContainer>
        </div>
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
