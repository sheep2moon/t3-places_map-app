import { Category } from "@prisma/client";
import React from "react";
import RoundedButton from "../../common/RoundedButton";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { FormValuesState } from "../../../pages/restaurant/categories";

type CategoryListProps = {
    formValues: FormValuesState;
    setIsModalOpen: (v: boolean) => void;
    setFormValues: (v: FormValuesState) => void;
    items: Category[];
};

const CategoryList = ({ formValues, items, setIsModalOpen, setFormValues }: CategoryListProps) => {
    const handleEdit = (name: string, color: string) => {
        const newState: FormValuesState = { ...formValues, name, color, isEdit: true };
        setFormValues(newState);
        setIsModalOpen(true);
    };

    return (
        <div className=" w-72 text-light">
            <h3>Lista kategorii</h3>
            <ul className="flex flex-col">
                {items.map(category => (
                    <ListItem key={category.id} name={category.name} color={category.color} handleEdit={handleEdit} />
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;

type ListItemProps = {
    name: string;
    color: string;
    handleEdit: (name: string, color: string) => void;
};

const ListItem = ({ name, color, handleEdit }: ListItemProps) => {
    return (
        <li className="flex items-center border border-light pr-2">
            <div className="self-stretch p-2" style={{ backgroundColor: color ? color : "transparent" }}></div>
            <span className="w-full  p-2 text-xl">{name}</span>
            <div className="flex grow justify-between py-2">
                <RoundedButton onClick={() => handleEdit(name, color)}>
                    <FiEdit3 />
                </RoundedButton>
                <RoundedButton>
                    <FiTrash2 />
                </RoundedButton>
            </div>
        </li>
    );
};
