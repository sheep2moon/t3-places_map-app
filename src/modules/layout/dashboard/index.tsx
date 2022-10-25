import React from "react";
import { trpc } from "../../../utils/trpc";
import LoadingSpinner from "../../common/LoadingSpinner";

const RestaurantLayout = ({ children }: { children: React.ReactNode }) => {
    const restaurant = trpc.useQuery(["restaurant.getRestaurant"]);

    if (restaurant.isLoading) return <LoadingSpinner />;

    return <div className="text-dark h-full dark:text-light">{children}</div>;
};

export default RestaurantLayout;
