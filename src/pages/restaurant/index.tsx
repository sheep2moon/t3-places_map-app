import { unstable_getServerSession } from "next-auth";
import Link from "next/link";
import React, { useEffect } from "react";
import LoadingSpinner from "../../modules/common/LoadingSpinner";
import NewRestaurant from "../../modules/restaurant/NewRestaurant";
import RestaurantTabs from "../../modules/restaurant/RestaurantTabs";
import { trpc } from "../../utils/trpc";
import { authOptions } from "../api/auth/[...nextauth]";

const Restaurant = () => {
    const restaurant = trpc.useQuery(["restaurant.getRestaurant"]);

    useEffect(() => {
        console.log(restaurant);
    }, [restaurant]);

    if (restaurant.isLoading) return <LoadingSpinner />;

    return (
        <div className="flex flex-col text-light">
            {!restaurant.data && <NewRestaurant refetch={restaurant.refetch} />}
            {restaurant.data && <RestaurantTabs />}
        </div>
    );
};

export default Restaurant;

export async function getServerSideProps(context: any) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions);

    console.log("session", session);

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        };
    } else {
        return { props: {} };
    }
}
