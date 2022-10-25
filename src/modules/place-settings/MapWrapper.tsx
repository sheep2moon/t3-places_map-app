import { Marker } from "react-leaflet";
import React, { ReactNode } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Place } from "../../pages/manage";

const MapWrapper = ({ children, place }: { children: ReactNode; place: Place }) => {
    return (
        <MapContainer center={[place.position.lat, place.position.lng]} zoom={13}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {children}
            <Marker position={[place.position.lat, place.position.lng]} />
        </MapContainer>
    );
};

export default MapWrapper;
