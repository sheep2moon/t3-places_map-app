import clsx from "clsx";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";

type ButtonProps = {
    isLoading?: boolean;
    variant?: "primary" | "secondary" | "alternative";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, isLoading = false, variant = "primary", ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            disabled={isLoading}
            className={clsx(
                "relative flex h-8  items-center justify-center rounded-sm px-1 text-base transition duration-200 disabled:opacity-50",
                {
                    " bg-violet-300 px-5 py-2.5  font-medium text-zinc-800 hover:bg-violet-200 focus:outline-none focus:ring-4 focus:ring-blue-300": variant === "primary",
                    "mr-2 mb-2 rounded-lg border border-purple-700 px-5 py-2.5 text-center text-sm font-medium text-purple-700 hover:bg-purple-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-300 dark:border-purple-400 dark:text-purple-200 dark:hover:bg-purple-500 dark:hover:text-white dark:focus:ring-purple-900":
                        variant === "secondary",
                    "mr-2 mb-2 rounded-lg bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 px-5 py-2.5 text-center font-medium text-white shadow-lg shadow-purple-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-purple-300 dark:shadow-lg dark:shadow-purple-800/80 dark:focus:ring-purple-800":
                        variant === "alternative"
                },
                className
            )}
        >
            {isLoading ? <LoadingSpinner size="small" /> : children}
        </button>
    );
};

export default Button;
