import { Tab } from "@headlessui/react";
import clsx from "clsx";
import React, { Fragment } from "react";
import Button from "../../modules/common/Button";
import InternalLink from "../../modules/common/links/InternalLink";
import LoadingSpinner from "../../modules/common/LoadingSpinner";
import { signOut, useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import UserAvatar from "../../modules/common/UserAvatar";
import { MdFavorite } from "react-icons/md";
import { useRouter } from "next/router";
import { usePlacesMapStore } from "../../zustand/placesMapStore";
import { Place, PlaceType } from "@prisma/client";
import PlaceTypeIcon from "../../modules/place/PlaceTypeIcon";
import { BiShowAlt } from "react-icons/bi";
import { IoWalk } from "react-icons/io5";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const tabList = [
    {
        id: 1,
        title: "Ulubione",
        icon: <MdFavorite className=" text-secondary" />
    },
    {
        id: 2,
        title: "Odwiedzone",
        icon: <IoWalk className=" text-secondary" />
    },
    {
        id: 3,
        title: "Dodane"
    }
];

const UserProfile = () => {
    const { data, isLoading } = trpc.useQuery(["user.getUserProfileData"]);

    if (!data || isLoading)
        return (
            <div className="h-container-screen relative w-full">
                <LoadingSpinner />
            </div>
        );

    return (
        <div className="flex w-full max-w-screen-xl flex-col">
            <section className="flex w-full flex-col items-center px-4 py-4 dark:bg-dark">
                <InternalLink className="ml-auto" href="/add-place">
                    + Dodaj miejsce
                </InternalLink>
                <div className="flex w-full items-center justify-between">
                    {/* <Button className="" variant="outline" onClick={() => signOut()}>
                        Wyloguj się
                    </Button> */}
                </div>
                <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                    {data.image && <UserAvatar image={data.image} />}
                    <h2 className="text-3xl font-extrabold leading-9 text-white sm:text-4xl sm:leading-10">{data.name}</h2>
                    <p className="mt-3 text-base leading-7 text-white sm:mt-4">{data.email}</p>
                </div>
                <div className="mt-4 text-center sm:mx-auto sm:grid sm:max-w-3xl sm:grid-cols-3 sm:gap-8">
                    <div>
                        <p className="text-5xl font-extrabold leading-none text-white">{data.UserLibrary?.visited.length}</p>
                        <p className="mt-2 text-base font-medium leading-6 text-white">Odwiedzonych miejsc</p>
                    </div>
                    <div className="mt-10 sm:mt-0">
                        <p className="text-5xl font-extrabold leading-none text-white">{data.places.length}</p>
                        <p className="mt-2 text-base font-medium leading-6 text-white">Dodanych miejsc</p>
                    </div>
                    <div className="mt-10 sm:mt-0">
                        <p className="text-5xl font-extrabold leading-none text-white">{data.reviews.length}</p>
                        <p className="mt-2 text-base font-medium leading-6 text-white">Dodanych recenzji</p>
                    </div>
                </div>
            </section>
            <Tab.Group as="div" className="mt-4 p-1">
                <Tab.List className="flex bg-light/5">
                    {tabList.map(tab => (
                        <Tab
                            key={tab.id}
                            className={({ selected }) =>
                                clsx("text-md flex w-full items-center justify-center gap-2 rounded-lg py-2.5 font-medium leading-5 ", "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2", {
                                    "bg-indigo-400 font-bold text-indigo-900 shadow": selected,
                                    "text-light hover:bg-white/[0.12] hover:text-white": !selected
                                })
                            }
                        >
                            {tab.icon}
                            {tab.title}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <div className="mt-2">
                            {data.UserLibrary?.wishlist.length === 0 && <span className="ml-4 text-xs">Brak ulubionych miejsc</span>}
                            {data.UserLibrary?.wishlist.map(place => (
                                <LibraryPlace key={place.id} place={place} />
                            ))}
                        </div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <div className="mt-2">
                            {data.UserLibrary?.visited.length === 0 && <h4 className="mt-8 text-center text-lg">Brak miejsc na liście do odwiedzenia</h4>}
                            {data.UserLibrary?.visited.map(place => (
                                <LibraryPlace key={place.id} place={place} />
                            ))}
                        </div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <div className="flex flex-col gap-2 py-2">
                            {data.places.map(place => (
                                <div key={place.id} className="flex w-full items-center rounded-sm bg-black/20 py-2 px-2 text-xl">
                                    <PlaceTypeIcon placeType={place.type} size="sm" />
                                    <div className="ml-4">{place.displayName}</div>
                                    <Link href={`/user-places/${place.id}`} className="ml-auto px-3">
                                        <FaArrowRight />
                                    </Link>
                                </div>
                            ))}
                            {data.places.length === 0 && (
                                <div className="flex items-center gap-1 py-1 text-xl">
                                    <span>Nie dodałeś jeszcze żadnych miejsc</span>
                                    <Link href="/add-place" className="rounded-sm bg-amber-200 p-1 text-xl text-primary">
                                        Dodaj miejsce
                                    </Link>
                                </div>
                            )}
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default UserProfile;

const LibraryPlace = ({ place }: { place: Place & { type: PlaceType } }) => {
    const { setCurrentPlaceId, setIsPlaceModalOpen } = usePlacesMapStore(state => state);
    const router = useRouter();
    console.log(place);

    const handleGoToPlace = () => {
        setCurrentPlaceId(place.id);
        setIsPlaceModalOpen(true);
        router.push("/places-map");
    };

    return (
        <div className="flex items-center gap-2 rounded-sm py-1 pr-1 ">
            <div>
                <PlaceTypeIcon size="sm" placeType={place.type} />
            </div>
            <span className="text-xl">{place.displayName}</span>
            <button onClick={handleGoToPlace} className="ml-auto flex items-center gap-2 rounded-sm p-2 hover:bg-primary/5 dark:text-amber-200 dark:hover:bg-light/5">
                <span className="text-base dark:text-amber-100">Mapa</span>
                <BiShowAlt />
            </button>
        </div>
    );
};
