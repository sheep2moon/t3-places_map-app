import { unstable_getServerSession } from "next-auth";
import React, { useState } from "react";
import LoadingSpinner from "../../modules/common/LoadingSpinner";
import RestaurantLayout from "../../modules/layout/dashboard";
import CategoryList from "../../modules/restaurant/categories/CategoryList";
import FormCategory from "../../modules/restaurant/categories/FormCategory";
import { trpc } from "../../utils/trpc";
import { authOptions } from "../api/auth/[...nextauth]";

export type HandleAddOrEditArgs = {
    name: string;
    color: string;
};

export type FormValuesState = {
    name: string;
    color: string;
    id: string;
    isEdit: boolean;
};

const defaultFormValues = { name: "", color: "#A8A4CE", id: "", isEdit: false };

const Categories = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValues, setFormValues] = useState<FormValuesState>(defaultFormValues);

    const { mutateAsync: createCategory } = trpc.useMutation(["manage.createCategory"]);
    const { mutateAsync: updateCategory } = trpc.useMutation(["manage.updateCategory"]);
    const categoriesQuery = trpc.useQuery(["manage.getCategories"]);

    if (categoriesQuery.isLoading) return <LoadingSpinner />;

    const handleConfirmForm = async () => {
        if (formValues.isEdit) {
            await updateCategory({
                name: formValues.name,
                color: formValues.color,
                id: formValues.id
            });
        } else {
            await createCategory({
                name: formValues.name,
                color: formValues.color
            });
        }
        setFormValues(defaultFormValues);
        setIsModalOpen(false);
        categoriesQuery.refetch();
    };

    const categoryFormProps = {
        isModalOpen,
        formValues,
        setFormValues,
        setIsModalOpen,
        handleConfirmForm
    };

    const categoryListProps = {
        setFormValues,
        setIsModalOpen,
        formValues,
        refetchCategories: categoriesQuery.refetch
    };

    return (
        <RestaurantLayout>
            <FormCategory {...categoryFormProps} />
            {categoriesQuery.data && <CategoryList {...categoryListProps} items={categoriesQuery.data} />}
        </RestaurantLayout>
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
