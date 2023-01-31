import React from "react";

type InputProps = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputText = React.forwardRef<HTMLInputElement, InputProps>(({ type = "text", className = "", name, value, handleChange, placeholder = "", ...props }, ref) => {
    return (
        <input
            {...props}
            ref={ref}
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={handleChange}
            className={
                className +
                "block w-full rounded-md border-2 border-primary/30 bg-light p-1 py-2 pl-2 pr-12 text-base text-primary focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-light dark:border-light/10 dark:bg-dark dark:text-light"
            }
            placeholder={placeholder}
        />
    );
});

InputText.displayName = "InputText";

export default InputText;
