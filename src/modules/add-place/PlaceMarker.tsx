import React, { useRef } from "react";
import { Marker, useMapEvent } from "react-leaflet";

const PlaceMarker = ({ placePosition, setPlacePosition }: PlacePositionState) => {
    const markerRef = useRef(null);

    const markerEventHandlers = {
        dragend: () => {
            const marker = markerRef.current;
            if (marker) {
                console.log(marker);
                // const { lat, lng } = marker.getLatLng();
                // setPlacePosition({ lat, lng });
            }
        },
        click: () => {
            console.log("click");
        }
    };

    useMapEvent("click", e => {
        const { lat, lng } = e.latlng;
        setPlacePosition({ lat, lng });
    });

    if (typeof placePosition === "undefined") return <></>;
    return <Marker ref={markerRef} draggable={true} position={[placePosition.lat, placePosition.lng]} eventHandlers={markerEventHandlers} />;
};

export default PlaceMarker;
