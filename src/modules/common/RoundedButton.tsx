import clsx from "clsx";
import React from "react";

type ButtonProps = {
    isLoading?: boolean;
    // variant?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const RoundedButton = ({ children, className, isLoading, ...rest }: ButtonProps) => {
    return (
        <div>
            <button {...rest} className={clsx("flex h-12 w-12 items-center justify-center rounded-full transition-all hover:bg-secondary/5", className)} disabled={isLoading}>
                {children}
            </button>
        </div>
    );
};

export default RoundedButton;
