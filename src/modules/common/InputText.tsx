import React from "react";

type InputProps = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputText = React.forwardRef<HTMLInputElement, InputProps>(({ type = "text", className = "", name, value, handleChange, placeholder = "", ...props }, ref) => {
    // const innerRef = useRef<HTMLInputElement>(null);

    // useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(ref, () => innerRef.current);

    return (
        <input
            // onFocus={() => innerRef.current?.focus()}
            // onBlur={() => innerRef.current?.blur()}
            {...props}
            ref={ref}
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={handleChange}
            className={className + " block w-full rounded-md border-gray-300 py-2 pl-2 pr-12 text-lg text-black focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-light dark:text-light"}
            placeholder={placeholder}
        />
    );
});

InputText.displayName = "InputText";

export default InputText;
