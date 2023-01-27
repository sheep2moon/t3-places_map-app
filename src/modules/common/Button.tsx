import clsx from "clsx";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";

type ButtonProps = {
    isLoading?: boolean;
    variant?: "filled" | "secondary" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, isLoading = false, variant = "filled", ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            disabled={isLoading}
            className={clsx(
                "relative flex h-8  items-center justify-center rounded-sm px-1 text-base transition duration-200 disabled:opacity-50",
                {
                    "rounded-lg bg-secondary px-5 py-2.5 text-sm font-medium text-dark hover:bg-white focus:outline-none focus:ring-4 focus:ring-secondary dark:focus:ring-secondary": variant === "filled",
                    "rounded-lg border border-purple-700 px-5 py-2.5 text-center text-sm font-medium text-purple-700 hover:bg-purple-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-300 dark:border-purple-400 dark:text-purple-200 dark:hover:bg-purple-500 dark:hover:text-white dark:focus:ring-purple-900":
                        variant === "secondary",
                    "rounded-lg border border-secondary px-5 py-2.5 text-center text-sm font-medium text-secondary hover:bg-secondary hover:text-dark focus:outline-none focus:ring-4 focus:ring-secondary dark:border-secondary dark:text-secondary dark:hover:bg-secondary  dark:hover:text-dark dark:focus:ring-secondary":
                        variant === "outline"
                },
                className
            )}
        >
            {isLoading ? <LoadingSpinner size="small" /> : children}
        </button>
    );
};

export default Button;
