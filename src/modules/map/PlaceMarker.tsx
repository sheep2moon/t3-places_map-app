import { Image as ImageType, Place, PlaceType } from "@prisma/client";
import Image from "next/image";
import L from "leaflet";
import React, { useRef } from "react";
React.useLayoutEffect = React.useEffect;
import { Marker, Popup, useMap } from "react-leaflet";
import { getPlaceImageSrc } from "../../utils/getImageSrc";
import Button from "../common/Button";
import { FaArrowRight } from "react-icons/fa";
import { usePlacesMapStore } from "../../zustand/placesMapStore";

type PlaceMarkerProps = {
    place: Place & { type: PlaceType; images: ImageType[] };
};

const PlaceMarker = ({ place }: PlaceMarkerProps) => {
    const markerRef = useRef<L.Marker>(null);
    const map = useMap();

    const { setCurrentPlaceId, setIsPlaceModalOpen } = usePlacesMapStore(state => state);
    const handleOpenModal = () => {
        setCurrentPlaceId(place.id);
        setIsPlaceModalOpen(true);
        map.flyTo({ lat: place.lat, lng: place.lng }, 12);
    };

    const placeIcon = L.icon({
        iconUrl: place.type.icon,
        iconSize: [22, 22]
    });

    return (
        <Marker icon={placeIcon} ref={markerRef} position={{ lat: place.lat, lng: place.lng }}>
            <Popup>
                <div className="relative flex h-[120px] w-[160px] flex-col overflow-hidden rounded-md">
                    <div className="absolute inset-0 z-10 bg-black/60 " />
                    {place.images[0] && <Image className="object-cover" src={getPlaceImageSrc(place.images[0]?.id)} alt="widok z miejsca" layout="fill" />}

                    <div className="absolute inset-0 z-20 mb-2 flex flex-col items-center gap-1 p-1 text-light">
                        <div className="mx-auto mt-1 flex items-center gap-2">
                            <div className="relative h-6 w-6">
                                <Image src={place.type.icon} alt="znacznik na mapie" layout="fill" />
                            </div>
                            <span className="">{place.type.title}</span>
                        </div>
                        <span className="max-h-8 overflow-hidden overflow-ellipsis break-words text-center text-lg leading-4">{place.displayName}</span>

                        <Button className="mx-auto mt-auto flex justify-between gap-2 " variant="secondary" onClick={handleOpenModal}>
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
