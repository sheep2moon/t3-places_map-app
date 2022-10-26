import { Marker, useMapEvent } from "react-leaflet";
import React, { ReactNode, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLng } from "leaflet";

const MapWrapper = ({ children }: { children: ReactNode }) => {
    // useMapEvent("click", e => {
    //     const { lat, lng } = e.latlng;
    // });
    return (
        <MapContainer center={[51.56, 22.24]} zoom={4}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {children}
        </MapContainer>
    );
};

export default MapWrapper;
