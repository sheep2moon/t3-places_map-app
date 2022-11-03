import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useNewPlaceStore } from "../../zustand/newPlaceStore";
import PlaceMarker from "./PlaceMarker";

const PlaceMap = () => {
    const { lat, lng, setPosition } = useNewPlaceStore(state => state);
    return (
        <div className="mt-2 h-screen max-h-[600px] w-screen max-w-[700px]">
            <MapContainer center={[52.09, 19.09]} zoom={6}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <PlaceMarker placePosition={{ lat, lng }} setPlacePosition={setPosition} />
            </MapContainer>
        </div>
    );
};

export default PlaceMap;
