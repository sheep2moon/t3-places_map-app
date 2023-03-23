import React, { useEffect } from "react";
import googleMapsIcon from "../../../assets/google-maps-icon.png";
import mapMarkerIcon from "../../../assets/map-marker-icon.svg";
import { inferQueryOutput, trpc } from "../../../utils/trpc";
import { usePlacesMapStore } from "../../../zustand/placesMapStore";
import ImageGallery from "./ImageGallery";
import Reviews from "./reviews/Reviews";
import TimeBadge from "../../common/badges/TimeBadge";
import UserBadge from "../../common/badges/UserBadge";
import PlaceTypeBadge from "../../common/badges/PlaceTypeBadge";
import HorizontalLine from "../../common/HorizontalLine";
import ModalContainer from "./ModalContainer";
import UserActions from "./UserActions";
import AddOrEditReview from "./reviews/AddOrEditReview";
import Image from "next/image";
import PlacePricing from "./PlacePricing";
import { useSession } from "next-auth/react";
import LoginEncourage from "./LoginEncourage";
import { getPlaceImageSrc } from "../../../utils/getImageSrc";
import { IoMdPricetags } from "react-icons/io";
import { FcStackOfPhotos } from "react-icons/fc";
import ImageSkeleton from "../../common/skeletons/ImageSkeleton";
import CardSkeleton from "../../common/skeletons/CardSkeleton";
import TextSkeleton from "../../common/skeletons/TextSkeleton";
import LineSkeleton from "../../common/skeletons/LineSkeleton";
import OptionsMenu from "./options-menu/OptionsMenu";
import { NextRouter, useRouter } from "next/router";

const PlaceDetailsModal = () => {
    const { currentPlaceId, isPlaceModalOpen, setIsPlaceModalOpen, flyTo, setCurrentPlaceId } = usePlacesMapStore(state => state);
    const { data, isLoading } = trpc.useQuery(["places.getPlaceDetails", { placeId: currentPlaceId }]);

    const router: NextRouter = useRouter();

    useEffect(() => {
        const placeId = router.query.placeId as string;
        if (placeId) {
            setCurrentPlaceId(placeId);
            setIsPlaceModalOpen(true);
            router.replace({ pathname: router.pathname, query: "" }, undefined, {
                shallow: true
            });
        }
    }, [router, setCurrentPlaceId, setIsPlaceModalOpen]);

    const handleCloseModal = () => {
        setIsPlaceModalOpen(false);
    };

    return (
        <div className=" z-[99] ">
            <ModalContainer isModalOpen={isPlaceModalOpen} close={handleCloseModal}>
                <div className="w-full bg-light pb-4 dark:bg-primary">
                    <div className="flex flex-col pb-12 text-primary dark:text-light">
                        {isLoading && <PlaceDetailsModalSkeleton />}
                        {!isLoading && data && <ModalContent data={data} />}
                    </div>
                </div>
            </ModalContainer>
        </div>
    );
};

export default PlaceDetailsModal;

interface ModalContentProps {
    data: inferQueryOutput<"places.getPlaceDetails">;
}

const ModalContent = ({ data }: ModalContentProps) => {
    const { currentPlaceId, setIsPlaceModalOpen, setFlyTo } = usePlacesMapStore(state => state);
    const session = useSession();

    const handleFlyToPlace = () => {
        if (data?.lat && data?.lng) {
            setFlyTo({ lat: data.lat, lng: data.lng });
            setIsPlaceModalOpen(false);
        }
    };

    if (!data) return <></>;

    return (
        <>
            <div className="relative h-48 w-full">
                {data?.images[0]?.id && <Image src={getPlaceImageSrc(data?.images[0]?.id)} alt="widok z miejsca" fill className="cover" />}
                <div className="absolute bottom-1 left-1">{data?.type && <PlaceTypeBadge size="sm" placeType={data.type} />}</div>
                <div className="absolute top-1 right-1">
                    <OptionsMenu placeId={currentPlaceId} />
                </div>
                <div className="absolute bottom-1 right-1">
                    <TimeBadge>
                        <span className="flex gap-1">{data?.createdAt.toLocaleString()}</span>
                    </TimeBadge>
                </div>
            </div>
            <div className="mt-4 flex flex-col items-start px-4">
                <span className="text-xl font-bold">{data?.displayName}</span>
                <div className="flex items-center gap-1 rounded-md ">
                    <span className="text-xs">Dodane przez:</span>
                    <UserBadge user={data?.addedBy} />
                </div>
            </div>

            <div className="mx-1 mt-1 grid grid-cols-2 gap-1">
                <a
                    className="flex w-full items-center justify-center gap-2 rounded-sm border-2 border-indigo-900 py-1 px-2 dark:bg-dark"
                    target="_blank"
                    rel="noreferrer"
                    href={`http://maps.google.com/maps?z=12&t=m&q=loc:${data.lat}+${data.lng}`}
                >
                    <Image alt="ikona map google" src={googleMapsIcon} width={32} height={32} />
                    <span className="text-sm">Otwórz w mapach Google</span>
                </a>
                <button onClick={handleFlyToPlace} className="flex items-center justify-center gap-2 rounded-sm border-2 border-indigo-900  px-2 py-1 dark:bg-dark">
                    <Image src={mapMarkerIcon} alt="ikona mapy z punktem" width={32} height={32} />
                    <span className="text-sm">Przybliz na mapie</span>
                </button>
            </div>
            <div className="px-2">
                <HorizontalLine>
                    <div className="flex items-center gap-1 text-base">
                        <span>Opis</span>
                    </div>
                </HorizontalLine>
                <div className="flex flex-col text-xs">
                    <pre className="whitespace-pre-wrap text-left font-mono text-lg">{data?.description}</pre>
                </div>

                {data.isPaid && data.prices && (
                    <>
                        <HorizontalLine className="mb-2">
                            <div className="flex items-center gap-1">
                                <IoMdPricetags />
                                Ceny
                            </div>
                        </HorizontalLine>
                        <PlacePricing prices={JSON.parse(data.prices)} />
                    </>
                )}
                <HorizontalLine className="mb-2">
                    <div className="flex items-center gap-1">
                        <FcStackOfPhotos />
                        <span className="text-base">Zdjęcia</span>
                    </div>
                </HorizontalLine>
                {data?.images && <ImageGallery images={data?.images} />}
                <HorizontalLine />
                {/* <HorizontalLine /> */}
                {session.status === "authenticated" ? <UserActions placeId={currentPlaceId} /> : <LoginEncourage />}
                {session.status === "authenticated" && <AddOrEditReview placeId={currentPlaceId} />}
                <Reviews placeId={currentPlaceId} />
            </div>
        </>
    );
};

const PlaceDetailsModalSkeleton = () => {
    return (
        <div className="w-full" role="status">
            <div className="h-48">
                <ImageSkeleton />
            </div>
            <div className="flex flex-col gap-4 px-4">
                <CardSkeleton />
                <LineSkeleton />
                <TextSkeleton />
                <LineSkeleton />
                <div className="grid h-36 grid-cols-3 gap-2 py-2">
                    <ImageSkeleton />
                    <ImageSkeleton />
                    <ImageSkeleton />
                </div>
                <LineSkeleton />
                <TextSkeleton />
            </div>
            <span className="sr-only">Wczytywanie...</span>
        </div>
    );
};
