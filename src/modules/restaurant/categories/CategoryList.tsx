import { Category } from "@prisma/client";
import React from "react";

type CategoryListProps = {
    items: Category[];
};

const CategoryList = ({ items }: CategoryListProps) => {
    return (
        <div className="w-full text-light">
            <h3>Lista kategorii</h3>
            {items.map(category => (
                <ListItem key={category.id} name={category.name} color={category.color} />
            ))}
        </div>
    );
};

export default CategoryList;

type ListItemProps = {
    name: string;
    color: string;
};

const ListItem = ({ name, color }: ListItemProps) => {
    return (
        <div className="flex w-full">
            <div className="p-2" style={{ backgroundColor: color ? color : "transparent" }}></div>
            <span className="w-full border border-light p-2 text-xl">{name}</span>
        </div>
    );
};
