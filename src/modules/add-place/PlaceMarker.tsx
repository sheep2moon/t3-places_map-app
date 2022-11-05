import React, { useRef } from "react";
import { Marker, useMapEvent } from "react-leaflet";

type PlacePositionProps = {
    placePosition?: Position;
    setPlacePosition: (p: Position) => void;
    disabled?: boolean;
};

const PlaceMarker = ({ placePosition, setPlacePosition, disabled = false }: PlacePositionProps) => {
    const markerRef = useRef(null);

    const markerEventHandlers = {
        click: () => {
            console.log("click");
        }
    };

    useMapEvent("click", e => {
        if (!disabled) {
            const { lat, lng } = e.latlng;
            setPlacePosition({ lat, lng });
        }
    });

    if (typeof placePosition === "undefined") return <></>;
    return <Marker ref={markerRef} position={[placePosition.lat, placePosition.lng]} eventHandlers={markerEventHandlers} />;
};

export default PlaceMarker;
