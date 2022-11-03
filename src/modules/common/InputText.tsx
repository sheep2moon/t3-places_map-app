import React, { ChangeEvent } from "react";

type InputProps = {
    name: string;
    value: string;
    className?: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
};

const InputText = ({ type = "text", className = "", name, value, handleChange, placeholder = "" }: InputProps) => {
    return (
        <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={handleChange}
            className={className + " block w-full rounded-md border-gray-300 py-2 pl-2 pr-12 text-lg text-black focus:border-indigo-500 focus:ring-indigo-500"}
            placeholder={placeholder}
        />
    );
};

export default InputText;
