import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
import PlaceMarker from "./PlaceMarker";

const PlaceMap = () => {
    const [placePosition, setPlacePosition] = useState<Position>();
    return (
        <div className="mt-2 h-screen max-h-[600px] w-screen max-w-[700px]">
            <MapContainer center={[52.09, 19.09]} zoom={6}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <PlaceMarker placePosition={placePosition} setPlacePosition={setPlacePosition} />
            </MapContainer>
        </div>
    );
};

export default PlaceMap;
