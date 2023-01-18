import clsx from "clsx";
import React from "react";
import { FiEdit } from "react-icons/fi";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const EditButton = ({ children, className, ...props }: ButtonProps) => {
    return (
        <button {...props} className={clsx("text-small-regular flex items-center gap-2 rounded-sm px-2 hover:text-violet-300 disabled:opacity-50 ", className)}>
            <FiEdit />
            {children}
        </button>
    );
};

export default EditButton;
