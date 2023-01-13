import clsx from "clsx";
import Link from "next/link";
import React from "react";

type InternalLinkProps = {
    href: string;
    variant?: "underline" | "filled";
    children: React.ReactNode;
};

const InternalLink = ({ href, variant = "filled", children }: InternalLinkProps) => {
    return (
        <Link href={href}>
            <a
                className={clsx("", {
                    "relative font-medium text-indigo-600 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100 dark:text-gray-100":
                        variant === "underline",
                    "mr-2 mb-2 rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800":
                        variant === "filled"
                })}
            >
                {children}
            </a>
        </Link>
    );
};

export default InternalLink;
