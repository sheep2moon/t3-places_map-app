import React from "react";

type InputProps = {
    value: number;
    label?: string;
    name?: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputNumber = ({ label, name, value, placeholder, onChange }: InputProps) => {
    return (
        <div className="grid grid-cols-[1fr_3fr] items-center gap-4">
            {label && <label>{label}</label>}
            <input className="rounded-md border border-light bg-slate-50 p-2 text-primary" value={value} name={name} onChange={onChange} placeholder={placeholder} type="number" />
        </div>
    );
};

export default InputNumber;
