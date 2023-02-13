import clsx from "clsx";
import React from "react";

type LabelProps = {
    children: React.ReactNode;
    isError?: boolean;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({ children, isError, ...rest }: LabelProps) => {
    return (
        <label className={clsx("rounded bg-gray-100 px-2.5 py-1 text-lg font-medium dark:bg-stone-900 ", { "text-red-500": isError, "text-gray-800 dark:text-gray-300": !isError })} {...rest}>
            {children}
        </label>
    );
};

export default Label;
