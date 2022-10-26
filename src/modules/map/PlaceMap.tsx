import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { Marker, useMapEvent } from "react-leaflet";
import MapWrapper from "./MapWrapper";

type PlaceMapProps = {
    placePosition?: Position;
    setPlacePosition: (p: Position) => void;
};

const PlaceMap = ({ placePosition, setPlacePosition }: PlaceMapProps) => {
    console.log(placePosition);

    // const MapContainer = dynamic(() => import("./MapWrapper"));
    const markerRef = useRef(null);

    // useEffect(() => {
    //     if (place?.position) {
    //         setPosition({ lat: place.position.lat, lng: place.position.lng });
    //     }
    // }, [place]);

    const eventHandlers = {
        dragend: () => {
            const marker = markerRef.current;
            if (marker) {
                console.log(marker);
                // const { lat, lng } = marker.getLatLng();
                // const newPosition = [lat, lng];
                // handleMove(markerIndex, newPosition);
            }
        },
        click: () => {
            console.log("click");
        }
    };

    return (
        <div className="mt-2 h-screen max-h-96 w-screen max-w-lg">
            <MapWrapper>
                <>{typeof placePosition !== "undefined" && <Marker ref={markerRef} draggable={true} position={[placePosition.lat, placePosition.lng]} eventHandlers={eventHandlers} />}</>
            </MapWrapper>
        </div>
    );
};

export default PlaceMap;
