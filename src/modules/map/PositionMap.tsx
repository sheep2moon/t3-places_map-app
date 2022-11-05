import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import PlaceMarker from "../add-place/PlaceMarker";

type PositionMapProps = {
    position: Position;
    setPosition: (p: Position) => void;
    disabled?: boolean;
};

const PositionMap = ({ position, setPosition, disabled }: PositionMapProps) => {
    return (
        <div className="relative mx-auto mt-2 aspect-square w-screen max-w-[270px] 2xsmall:max-w-[360px] xsmall:max-w-[512px]">
            <MapContainer center={position ? [position.lat, position.lng] : [52.09, 19.09]} zoom={position ? 13 : 6}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <PlaceMarker disabled={disabled} placePosition={position} setPlacePosition={setPosition} />
            </MapContainer>
        </div>
    );
};

export default PositionMap;
