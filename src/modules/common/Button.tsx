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
                "text-small-regular flex w-full items-center justify-center rounded-sm px-5 py-[10px] uppercase transition-colors duration-200 disabled:opacity-50",
                {
                    "bg-violet-300 px-5 py-2.5 text-sm font-medium text-zinc-800 hover:bg-violet-200 focus:outline-none focus:ring-4 focus:ring-blue-300": variant === "primary",
                    " bg-violet-300 py-0 px-2 text-primary hover:bg-violet-200": variant === "secondary",
                    "border border-gray-200 bg-slate-200 py-2.5 px-5 text-sm font-medium  text-gray-900 hover:bg-slate-300 hover:text-emerald-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200": variant === "alternative"
                },
                className
            )}
        >
            {isLoading ? <LoadingSpinner /> : children}
        </button>
    );
};

export default Button;
