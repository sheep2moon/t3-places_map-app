import { Category } from "@prisma/client";
import React from "react";
import RoundedButton from "../../common/RoundedButton";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { FormValuesState } from "../../../pages/restaurant/categories";
import { trpc } from "../../../utils/trpc";

type CategoryListProps = {
    formValues: FormValuesState;
    setIsModalOpen: (v: boolean) => void;
    setFormValues: (v: FormValuesState) => void;
    items: Category[];
    refetchCategories: () => void;
};

const CategoryList = ({ formValues, items, setIsModalOpen, setFormValues, refetchCategories }: CategoryListProps) => {
    const { mutateAsync: deleteCategory } = trpc.useMutation("manage.deleteCategory");

    const handleEdit = (name: string, color: string, id: string) => {
        const newState: FormValuesState = { ...formValues, name, color, isEdit: true, id };
        setFormValues(newState);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        await deleteCategory({ id });
        refetchCategories();
    };

    return (
        <div className=" w-72 text-light">
            <h3>Lista kategorii</h3>
            <ul className="flex flex-col">
                {items.map(category => (
                    <ListItem key={category.id} category={category} handleEdit={handleEdit} handleDelete={handleDelete} />
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;

type ListItemProps = {
    category: Category;
    handleEdit: (name: string, color: string, id: string) => void;
    handleDelete: (id: string) => void;
};

const ListItem = ({ category: { color, name, id }, handleEdit, handleDelete }: ListItemProps) => {
    return (
        <li className="flex items-center border border-light pr-2">
            <div className="self-stretch p-2" style={{ backgroundColor: color ? color : "transparent" }}></div>
            <span className="w-full  p-2 text-xl">{name}</span>
            <div className="flex grow justify-between py-2">
                <RoundedButton onClick={() => handleEdit(name, color, id)}>
                    <FiEdit3 />
                </RoundedButton>
                <RoundedButton onClick={() => handleDelete(id)}>
                    <FiTrash2 />
                </RoundedButton>
            </div>
        </li>
    );
};
