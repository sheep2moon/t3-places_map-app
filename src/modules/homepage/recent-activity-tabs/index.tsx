import { Tab } from "@headlessui/react";
import clsx from "clsx";
import React from "react";
import { trpc } from "../../../utils/trpc";
import HorizontalLine from "../../common/HorizontalLine";
import RecentlyAddedPlaces from "./RecentlyAddedPlaces";
import RecentlyAddedReviews from "./RecentlyAddedReviews";

const RecentActivityTabs = () => {
    const recentlyAddedPlaces = trpc.useQuery(["places.getRecentlyAddedPlaces"]);
    const recentlyAddedReviews = trpc.useQuery(["places.getRecentlyAddedReviews"]);

    return (
        <div className="rounded-md pt-8 ">
            <Tab.Group>
                <HorizontalLine>
                    <Tab.List className="flex w-80 gap-2 lg:w-96">
                        <Tab
                            className={({ selected }) =>
                                clsx(
                                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 shadow shadow-dark/40 ring-white ring-opacity-60 ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-2 lg:text-base",
                                    { "bg-white/[0.12] font-bold dark:text-secondary": selected },
                                    { "bg-dark/20 text-dark shadow-sm shadow-secondary/20 hover:bg-white/[0.12] hover:text-secondary dark:text-light": !selected }
                                )
                            }
                        >
                            Ostatnio dodane
                        </Tab>

                        <Tab
                            className={({ selected }) =>
                                clsx(
                                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 shadow shadow-dark/40 ring-white ring-opacity-60 ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-2 lg:text-base",
                                    { "bg-white/[0.12] font-bold dark:text-secondary": selected },
                                    { "bg-dark/20 text-dark shadow-sm shadow-secondary/20 hover:bg-white/[0.12] hover:text-secondary dark:text-light": !selected }
                                )
                            }
                        >
                            Ostatnie recenzje
                        </Tab>
                    </Tab.List>
                </HorizontalLine>
                <Tab.Panels className="mt-4 h-64 px-4">
                    <Tab.Panel className="h-full ">
                        <RecentlyAddedPlaces queryResult={recentlyAddedPlaces} />
                    </Tab.Panel>
                    <Tab.Panel className="h-full">
                        <RecentlyAddedReviews queryResult={recentlyAddedReviews} />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default RecentActivityTabs;
