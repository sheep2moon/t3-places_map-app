import React from "react";
import { trpc } from "../../../utils/trpc";
import LoadingSpinner from "../../common/LoadingSpinner";
import NewRestaurant from "../../restaurant/NewRestaurant";
import RestaurantTabs from "../../restaurant/RestaurantTabs";

const RestaurantLayout = ({ children }: { children: React.ReactNode }) => {
    const restaurant = trpc.useQuery(["restaurant.getRestaurant"]);

    if (restaurant.isLoading) return <LoadingSpinner />;

    return (
        <div className=" text-light">
            {!restaurant.data && <NewRestaurant refetch={restaurant.refetch} />}
            {restaurant.data && (
                <div className="flex min-h-[80vh] flex-col items-center justify-start">
                    <RestaurantTabs />
                    <div className="my-auto flex h-full w-full flex-col justify-center">{children}</div>
                </div>
            )}
        </div>
    );
};

export default RestaurantLayout;
