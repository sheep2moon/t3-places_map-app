import { unstable_getServerSession } from "next-auth";
import React, { useState } from "react";
import LoadingSpinner from "../../modules/common/LoadingSpinner";
import CategoryList from "../../modules/restaurant/categories/CategoryList";
import NewCategory from "../../modules/restaurant/categories/NewCategory";
import { trpc } from "../../utils/trpc";
import { authOptions } from "../api/auth/[...nextauth]";

const Categories = () => {
    const categoriesQuery = trpc.useQuery(["manage.getCategories"]);

    if (categoriesQuery.isLoading) return <LoadingSpinner />;

    return (
        <div>
            <NewCategory refetch={categoriesQuery.refetch} />
            {categoriesQuery.data && <CategoryList items={categoriesQuery.data} />}
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
