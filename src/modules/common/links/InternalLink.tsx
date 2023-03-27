import clsx from "clsx";
import Link from "next/link";
import React from "react";

type InternalLinkProps = {
    href: string;
    variant?: "underline" | "filled";
    children: React.ReactNode;
    className?: string;
};

const InternalLink = ({ href, variant = "filled", className, children }: InternalLinkProps) => {
    return (
        <Link
            href={href}
            className={clsx(
                "relative block w-fit",
                {
                    "relative font-medium text-indigo-600 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100 dark:text-gray-100":
                        variant === "underline",
                    "group relative inline-flex cursor-pointer items-center justify-center rounded border-b-4 border-l-2 border-indigo-700 bg-gradient-to-tr from-indigo-600 to-indigo-500 px-2.5 py-2 text-white shadow-lg hover:border-indigo-800 active:border-indigo-600 active:shadow-none small:px-3.5":
                        variant === "filled"
                },
                className
            )}
        >
            {children}
        </Link>
    );
};

export default InternalLink;
