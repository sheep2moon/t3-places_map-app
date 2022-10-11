import { unstable_getServerSession } from "next-auth";
import React from "react";

import RestaurantLayout from "../../modules/layout/restaurant";
import { authOptions } from "../api/auth/[...nextauth]";

const Restaurant = () => {
    return (
        <RestaurantLayout>
            <div>index page</div>
        </RestaurantLayout>
    );
};

export default Restaurant;

export async function getServerSideProps(context: any) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions);

    // console.log("session", session?.user);
    // const restaurantId = typeof session?.user?.restaurantId === "string" ? session?.user?.restaurantId : "";
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
