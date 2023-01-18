import { Tab } from "@headlessui/react";
import clsx from "clsx";
import React, { forwardRef } from "react";
import { trpc } from "../../../utils/trpc";
import HorizontalLine from "../../common/HorizontalLine";
import RecentlyAddedPlaces from "./RecentlyAddedPlaces";
import RecentlyAddedReviews from "./RecentlyAddedReviews";

const RecentActivityTabs = () => {
    const recentlyAddedPlaces = trpc.useQuery(["places.getRecentlyAddedPlaces"]);
    const recentlyAddedReviews = trpc.useQuery(["places.getRecentlyAddedReviews"]);

    return <div className="rounded-md pt-8 "></div>;
};

export default RecentActivityTabs;
