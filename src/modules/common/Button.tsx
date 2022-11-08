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
                "relative flex h-8  items-center justify-center rounded-sm px-1 text-xs transition-colors duration-200 disabled:opacity-50",
                {
                    " bg-violet-300 px-5 py-2.5 text-sm font-medium text-zinc-800 hover:bg-violet-200 focus:outline-none focus:ring-4 focus:ring-blue-300": variant === "primary",
                    " w-28 bg-violet-300 px-1 py-1 text-primary hover:bg-violet-200": variant === "secondary",
                    "bg-primary/20 py-1 px-3 text-sm font-medium text-gray-900 hover:bg-slate-300 hover:text-emerald-900  focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-light/10 dark:text-light ":
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
