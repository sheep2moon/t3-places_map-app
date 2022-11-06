import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { trpc } from "../../utils/trpc";
import PlaceMarker from "../map/PlaceMarker";

const PlacesMap = () => {
    const places = trpc.useQuery(["places.getPlaces"]);
    return (
        <div className="relative mx-auto mt-2 aspect-square w-screen max-w-[270px] 2xsmall:max-w-[360px] xsmall:max-w-[512px]">
            <MapContainer center={[52.09, 19.09]} zoom={6}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {places.data && places.data.map(place => <PlaceMarker key={place.id} place={place} />)}
            </MapContainer>
        </div>
    );
};

export default PlacesMap;
