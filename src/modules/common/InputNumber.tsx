import React from "react";

type InputProps = {
    label: string;
    value: number;
    name?: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputNumber = ({ label, name, value, placeholder, onChange }: InputProps) => {
    return (
        <div className="grid grid-cols-[1fr_3fr] gap-4 items-center">
            <label>{label}</label>
            <input className="bg-primary p-2 border border-light rounded-md" value={value} name={name} onChange={onChange} placeholder={placeholder} type="number" />
        </div>
    );
};

export default InputNumber;
