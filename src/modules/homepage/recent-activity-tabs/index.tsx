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
        <div className="mt-8 rounded-md bg-light py-4 dark:bg-primary">
            <Tab.Group>
                <HorizontalLine>
                    <Tab.List className="flex w-60 lg:w-96">
                        <CustomTab>Ostatnio dodane</CustomTab>
                        <CustomTab>Ostatnie komentarze</CustomTab>
                    </Tab.List>
                </HorizontalLine>
                <Tab.Panels className="mt-8 px-4">
                    <Tab.Panel className="relative">
                        <RecentlyAddedPlaces queryResult={recentlyAddedPlaces} />
                    </Tab.Panel>
                    <Tab.Panel className="relative">
                        <RecentlyAddedReviews queryResult={recentlyAddedReviews} />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default RecentActivityTabs;

const CustomTab = ({ children }: { children: React.ReactNode }) => {
    return (
        <Tab
            className={({ selected }) =>
                clsx(
                    "w-full rounded-lg py-2.5 font-medium leading-5 ring-white ring-opacity-60 ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-2 ",
                    { "bg-white shadow dark:text-dark": selected },
                    { "text-dark hover:bg-white/[0.12] hover:text-secondary dark:text-light": !selected }
                )
            }
        >
            {children}
        </Tab>
    );
};
