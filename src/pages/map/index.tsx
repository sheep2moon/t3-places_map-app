import { unstable_getServerSession } from "next-auth";
import React from "react";

import RestaurantLayout from "../../modules/layout/dashboard";

import { authOptions } from "../api/auth/[...nextauth]";

const Restaurant = () => {
    return <RestaurantLayout>index</RestaurantLayout>;
};

export default Restaurant;

export async function getServerSideProps(context: any) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions);
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
