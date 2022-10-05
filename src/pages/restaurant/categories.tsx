import { unstable_getServerSession } from "next-auth";
import React, { useState } from "react";
import NewCategory from "../../modules/restaurant/categories/NewCategory";
import { authOptions } from "../api/auth/[...nextauth]";

const Categories = () => {
    return (
        <div>
            <NewCategory />
        </div>
    );
};

export default Categories;

export async function getServerSideProps(context: any) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions);

    console.log("session", session);

    if (!session) {
        return {
            redirect: {
                destination: "/auth/signin",
                permanent: false
            }
        };
    } else {
        return { props: {} };
    }
}
