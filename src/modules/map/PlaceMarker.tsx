import { Image as ImageType, Place, PlaceType } from "@prisma/client";
import Image from "next/image";
import L from "leaflet";
import React, { useRef } from "react";
React.useLayoutEffect = React.useEffect;
import { Marker, Popup } from "react-leaflet";
import { getPlaceImageSrc } from "../../utils/getImageSrc";
import Button from "../common/Button";
import { FaArrowRight } from "react-icons/fa";
import { usePlacesMapStore } from "../../zustand/placesMapStore";

type PlaceMarkerProps = {
    place: Place & { type: PlaceType; images: ImageType[] };
};

const PlaceMarker = ({ place }: PlaceMarkerProps) => {
    const markerRef = useRef<L.Marker>(null);

    const { setCurrentPlaceId, setIsPlaceModalOpen } = usePlacesMapStore(state => state);
    const handleOpenModal = () => {
        setCurrentPlaceId(place.id);
        setIsPlaceModalOpen(true);
    };

    const placeIcon = L.icon({
        iconUrl: place.type.icon,
        iconSize: [22, 22]
    });

    return (
        <Marker icon={placeIcon} ref={markerRef} position={{ lat: place.lat, lng: place.lng }}>
            <Popup>
                <div className="relative flex h-[140px] w-[180px] flex-col overflow-hidden rounded-md">
                    <div className="absolute inset-0 z-10 bg-dark/60 " />
                    {place.images[0] && <Image className="object-cover" src={getPlaceImageSrc(place.images[0]?.id)} alt="widok z miejsca" fill />}

                    <div className="absolute inset-0 z-20 flex flex-col gap-1 p-1 text-light">
                        <div className="mt-1 flex items-center gap-1">
                            <div className="relative h-4 w-4">
                                <Image src={place.type.icon} alt="znacznik na mapie" layout="fill" />
                            </div>
                            <span className="text-sm ">{place.type.title}</span>
                        </div>
                        <span className="h-12 text-center text-base line-clamp-2">{place.displayName}</span>

                        <Button className="mx-auto mt-auto mb-2 flex justify-between gap-2 " variant="filled" onClick={handleOpenModal}>
                            Szczegóły
                            <FaArrowRight />
                        </Button>
                    </div>
                </div>
            </Popup>
        </Marker>
    );
};

export default PlaceMarker;
