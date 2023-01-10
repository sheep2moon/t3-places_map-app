import React from "react";

type LabelProps = {
    children: React.ReactNode;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({ children, ...rest }: LabelProps) => {
    return (
        <label className="mr-2 rounded bg-gray-100 px-2.5 py-1 text-lg font-medium text-gray-800 dark:bg-stone-900 dark:text-gray-300" {...rest}>
            {children}
        </label>
    );
};

export default Label;
