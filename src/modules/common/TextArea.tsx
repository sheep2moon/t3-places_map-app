import React from "react";

type TextAreaProps = {
    placeholder?: string;
    value: string;
    name: string;
    className?: string;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea = ({ placeholder, className = "", name, value, handleChange }: TextAreaProps) => {
    return (
        <div className="flex w-full flex-col gap-1">
            <textarea id={name} name={name} className={className + " h-32 rounded-sm border bg-light p-1 text-primary"} placeholder={placeholder} value={value} onChange={handleChange} />
        </div>
    );
};

export default TextArea;
