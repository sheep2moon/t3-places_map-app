import React, { ChangeEvent } from "react";

type InputProps = {
    label?: string;
    name: string;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
};

const InputText = ({ label, type = "text", name, value, handleChange, placeholder = "" }: InputProps) => {
    return (
        <div className="text-primary">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-light">
                    {label}
                </label>
            )}
            <div className="relative mt-1 rounded-md shadow-sm">
                <input
                    type={type}
                    name={name}
                    id={name}
                    value={value}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 py-2 pl-2 pr-12 text-lg focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};

export default InputText;
