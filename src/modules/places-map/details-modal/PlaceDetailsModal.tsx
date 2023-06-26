import React, { useEffect, Fragment } from "react";
import googleMapsIcon from "../../../assets/google-maps-icon.png";
import mapMarkerIcon from "../../../assets/map-marker-icon.svg";
import { inferQueryOutput, trpc } from "../../../utils/trpc";
import { usePlacesMapStore } from "../../../zustand/placesMapStore";
import ImageGallery from "./ImageGallery";
import { Dialog, Transition } from "@headlessui/react";
import { IoIosArrowBack } from "react-icons/io";
import Reviews from "./reviews/Reviews";
import TimeBadge from "../../common/badges/TimeBadge";
import UserBadge from "../../common/badges/UserBadge";
import UserActions from "./UserActions";
import AddOrEditReview from "./reviews/AddOrEditReview";
import Image from "next/image";
import PlacePricing from "./PlacePricing";
import { useSession } from "next-auth/react";
import LoginEncourage from "./LoginEncourage";
import { getPlaceImageSrc } from "../../../utils/getImageSrc";
import { IoMdPricetags } from "react-icons/io";
import ImageSkeleton from "../../common/skeletons/ImageSkeleton";
import CardSkeleton from "../../common/skeletons/CardSkeleton";
import TextSkeleton from "../../common/skeletons/TextSkeleton";
import LineSkeleton from "../../common/skeletons/LineSkeleton";
import OptionsMenu from "./options-menu/OptionsMenu";
import { NextRouter, useRouter } from "next/router";
import PlaceTypeAndRating from "./PlaceTypeAndRating";
import {
  MdOutlineNoPhotography,
  MdOutlinePhotoSizeSelectActual,
} from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import HorizontalLine from "../../common/HorizontalLine";
import { encode } from "querystring";

const PlaceDetailsModal = () => {
  const {
    currentPlaceId,
    isPlaceModalOpen,
    setIsPlaceModalOpen,
    setCurrentPlaceId,
  } = usePlacesMapStore((state) => state);
  const { data, isLoading } = trpc.useQuery([
    "places.getPlaceDetails",
    { placeId: currentPlaceId },
  ]);

  const router: NextRouter = useRouter();

  useEffect(() => {
    const placeId = router.query.placeId as string;
    if (placeId) {
      setCurrentPlaceId(placeId);
      setIsPlaceModalOpen(true);
    }
  }, [router.query, setCurrentPlaceId, setIsPlaceModalOpen]);

  const closeModal = () => {
    setIsPlaceModalOpen(false);
    const query = router.query;

    delete query.placeId;
    const updatedQuery = encode(query);
    const newQuery = new URLSearchParams(updatedQuery);

    const newUrl = `${router.pathname}?${newQuery}`;
    window.history.replaceState(
      { ...window.history.state, as: newUrl, url: newUrl },
      "",
      newUrl
    );
  };

  return (
    <div className=" z-[99] bg-dark">
      <>
        <Transition appear show={isPlaceModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-[9999]" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-light bg-opacity-50 dark:bg-black/50" />
            </Transition.Child>

            <div className="fixed right-0 top-16 bottom-0  shadow-md shadow-black/50 dark:bg-dark">
              <div className="flex h-[calc(100vh_-_4rem)] items-center justify-center overflow-y-scroll text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-100"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Panel className="relative h-full w-screen transform  align-middle shadow-xl transition-all  md:max-w-[480px]">
                    <button
                      onClick={closeModal}
                      className="absolute left-4 top-4 z-10 flex h-12 w-12 items-center justify-start rounded-full bg-indigo-600 text-secondary shadow-sm shadow-white/40 dark:bg-dark dark:text-secondary "
                    >
                      <label className="sr-only">
                        Zamknij szczegóły miejsca
                      </label>
                      <IoIosArrowBack className="ml-2 text-3xl" />
                    </button>
                    <div className="w-full pb-4 ">
                      <div className="flex flex-col pb-12 text-primary dark:text-light">
                        {isLoading && <PlaceDetailsModalSkeleton />}
                        {!isLoading && data && <ModalContent data={data} />}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    </div>
  );
};

export default PlaceDetailsModal;

interface ModalContentProps {
  data: inferQueryOutput<"places.getPlaceDetails">;
}

const ModalContent = ({ data }: ModalContentProps) => {
  const { currentPlaceId, setIsPlaceModalOpen, setFlyTo } = usePlacesMapStore(
    (state) => state
  );
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
      <div className="relative -mb-4 h-60 w-full">
        {data.images[0] ? (
          <Image
            src={getPlaceImageSrc(data?.images[0]?.id)}
            alt="widok z miejsca"
            fill
            className=" object-contain"
          />
        ) : (
          <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 text-center align-middle">
            <MdOutlineNoPhotography className="text-3xl" />
            <span>Brak zdjęć</span>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <OptionsMenu placeId={currentPlaceId} />
        </div>
      </div>
      <div className="z-10 rounded-t-3xl border-t-2 border-light/20 bg-light pb-8  dark:bg-dark">
        <div className="mt-2 flex flex-col items-start px-4">
          <span className="text-xl font-bold">{data?.displayName}</span>
          <div className="flex items-center gap-1 rounded-md ">
            <span className="text-xs">Dodane przez:</span>
            <UserBadge user={data?.addedBy} />
            <TimeBadge>
              <span className="flex gap-1">
                {data?.createdAt.toLocaleString()}
              </span>
            </TimeBadge>
          </div>
          <PlaceTypeAndRating
            placeType={data.type}
            placeReviews={data.reviews}
          />
        </div>
        <div className="mx-1 mt-4 grid grid-cols-2 gap-1">
          <a
            className="flex w-full items-center justify-center gap-2 rounded-sm border-2 border-indigo-900 py-1 px-2 dark:bg-indigo-700"
            target="_blank"
            rel="noreferrer"
            href={`http://maps.google.com/maps?z=12&t=m&q=loc:${data.lat}+${data.lng}`}
          >
            <Image
              alt="ikona map google"
              src={googleMapsIcon}
              width={32}
              height={32}
            />
            <span className="text-sm">Otwórz w mapach Google</span>
          </a>
          <button
            onClick={handleFlyToPlace}
            className="flex items-center justify-center gap-2 rounded-sm border-2 border-indigo-900  px-2 py-1 dark:bg-indigo-700"
          >
            <Image
              src={mapMarkerIcon}
              alt="ikona mapy z punktem"
              width={32}
              height={32}
            />
            <span className="text-sm">Przybliz na mapie</span>
          </button>
        </div>

        <div className="p-2">
          <h3 className="flex items-center gap-1 text-left text-xl font-bold">
            <BsPencilSquare />
            Opis
          </h3>
          <div className="flex flex-col rounded-md p-2 text-xs shadow-sm shadow-black/40 dark:bg-black/20">
            <pre className="whitespace-pre-wrap text-left font-sans text-lg">
              {data?.description}
            </pre>
          </div>

          {data.isPaid && data.prices && (
            <>
              <h3 className="mt-4 flex items-center gap-1 text-xl font-bold">
                <IoMdPricetags />
                Ceny
              </h3>
              <PlacePricing prices={JSON.parse(data.prices)} />
            </>
          )}

          {data.images.length > 0 && (
            <>
              <h3 className="mt-4 flex items-center gap-1 text-xl font-bold">
                <MdOutlinePhotoSizeSelectActual />
                Więcej zdjęć
              </h3>
              <ImageGallery images={data.images} />
            </>
          )}
        </div>

        <div className="">
          {session.status === "authenticated" ? (
            <UserActions placeId={currentPlaceId} />
          ) : (
            <>
              <HorizontalLine />
              <LoginEncourage />
              <HorizontalLine />
            </>
          )}
          {session.status === "authenticated" && (
            <AddOrEditReview placeId={currentPlaceId} />
          )}
        </div>
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
