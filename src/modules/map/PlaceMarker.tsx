import { Image as ImageType, Place, PlaceType } from "@prisma/client";
import Image from "next/image";
import L from "leaflet";
import React, { useEffect, useRef } from "react";
import { Marker, Popup } from "react-leaflet";
import { renderToString } from "react-dom/server";
import { getPlaceImageSrc } from "../../utils/getImageSrc";
import Button from "../common/Button";
import { FaArrowRight } from "react-icons/fa";

type PlaceMarkerProps = {
    place: Place & { type: PlaceType; images: ImageType[] };
};

const PlaceMarker = ({ place }: PlaceMarkerProps) => {
    const markerRef = useRef<L.Marker>(null);
    useEffect(() => {
        const iconHtml = renderToString(<MarkerIcon type={place.type} />);
        const customIcon = new L.DivIcon({ html: iconHtml, iconAnchor: [13, 13], iconSize: [22, 22] });
        if (markerRef.current !== null) {
            markerRef.current.setIcon(customIcon);
        }
    }, [place.type]);
    return (
        <Marker ref={markerRef} position={{ lat: place.lat, lng: place.lng }}>
            <Popup>
                <div className="flex w-full min-w-[160px] flex-col">
                    <div className="mb-2 flex items-center gap-1">
                        <div className="relative h-6 w-6">
                            <Image src={place.type.icon} alt="znacznik na mapie" layout="fill" />
                        </div>
                        <span>{place.type.title}</span>
                    </div>
                    <span>{place.displayName}</span>
                    {place.images[0] && (
                        <div className="relative mx-auto h-20 w-20">
                            <Image src={getPlaceImageSrc(place.images[0]?.id)} alt="widok z miejsca" layout="fill" />
                        </div>
                    )}
                    <Button className="mt-2 flex justify-between" variant="secondary">
                        Szczegóły
                        <FaArrowRight />
                    </Button>
                </div>
            </Popup>
        </Marker>
    );
};

const MarkerIcon = ({ type }: { type: PlaceType }) => {
    return (
        <div className="relative h-5 w-5">
            <Image src={type.icon} alt="znacznik na mapie" layout="fill" />
        </div>
    );
};

export default PlaceMarker;
