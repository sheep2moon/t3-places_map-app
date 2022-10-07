import { unstable_getServerSession } from "next-auth";
import React, { useState } from "react";
import LoadingSpinner from "../../modules/common/LoadingSpinner";
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

const Categories = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formValues, setFormValues] = useState<FormValuesState>({ name: "", color: "", id: "", isEdit: false });

    const { mutateAsync: createCategory } = trpc.useMutation(["manage.createCategory"]);
    const categoriesQuery = trpc.useQuery(["manage.getCategories"]);

    if (categoriesQuery.isLoading) return <LoadingSpinner />;

    const handleConfirmForm = () => {
        if (formValues.isEdit) {
            //update with id
        } else {
            createCategory({ name: formValues.name, color: formValues.color });
        }
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
        formValues
    };

    return (
        <div>
            <FormCategory {...categoryFormProps} />
            {categoriesQuery.data && <CategoryList {...categoryListProps} items={categoriesQuery.data} />}
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
