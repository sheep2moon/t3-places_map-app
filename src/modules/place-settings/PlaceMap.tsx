import dynamic from "next/dynamic";
import React from "react";

import { Place } from "../../pages/manage";

type PlaceMapProps = {
    place?: Place;
    setPlace: (p: Place) => void;
};

const PlaceMap = ({ place, setPlace }: PlaceMapProps) => {
    const MapContainer = dynamic(() => import("./MapWrapper"));

    return (
        <div className="mt-2 h-screen max-h-96 w-screen max-w-lg">
            {place && (
                <MapContainer place={place}>
                    <></>
                </MapContainer>
            )}
        </div>
    );
};

export default PlaceMap;
