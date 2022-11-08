import React from "react";

type TextAreaProps = {
    placeholder?: string;
    value: string;
    name: string;
    className?: string;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = ({ placeholder, className = "", name, value, handleChange, ...props }: TextAreaProps) => {
    return (
        <div className="flex w-full flex-col gap-1">
            <textarea
                {...props}
                id={name}
                name={name}
                className={className + " h-32 rounded-md border-2 border-primary/30 bg-light p-1 text-sm text-primary dark:bg-black/20 dark:text-light"}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default TextArea;
