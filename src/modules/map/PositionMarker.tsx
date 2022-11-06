import React, { useRef } from "react";
import { Marker, useMapEvent } from "react-leaflet";

type PositionMarkerProps = {
    placePosition?: Position;
    setPlacePosition: (p: Position) => void;
    disabled?: boolean;
};

const PositionMarker = ({ placePosition, setPlacePosition, disabled = false }: PositionMarkerProps) => {
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

export default PositionMarker;
