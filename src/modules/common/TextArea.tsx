import React from "react";

type TextAreaProps = {
    placeholder?: string;
    value: string;
    name: string;
    className?: string;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ placeholder, className = "", name, value, handleChange, ...props }, ref) => {
    console.log(props);

    return (
        <div className="flex w-full flex-col gap-1">
            <textarea
                ref={ref}
                {...props}
                id={name}
                name={name}
                className={className + "h-32 rounded-md border-2 border-primary/30 bg-light p-1 text-base text-primary dark:border-light/10 dark:bg-dark/50 dark:text-light "}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
});

TextArea.displayName = "TextArea";

export default TextArea;
