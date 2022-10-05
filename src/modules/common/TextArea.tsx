import React from "react";

type TextAreaProps = {
    placeholder?: string;
    label?: string;
    value: string;
    setValue: (v: string) => void;
};

const TextArea = ({ label = "", placeholder, value, setValue }: TextAreaProps) => {
    return (
        <div className="flex flex-col w-full gap-1">
            <label>{label}</label>
            <textarea className="bg-primary border rounded-sm h-32 px-2" placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} />
        </div>
    );
};

export default TextArea;
