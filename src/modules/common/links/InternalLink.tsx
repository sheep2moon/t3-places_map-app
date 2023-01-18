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
                    "rounded-md border bg-primary px-2 py-2.5 text-sm font-bold text-secondary hover:border-dark hover:bg-transparent hover:text-dark focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-secondary dark:text-dark dark:hover:bg-white dark:focus:ring-secondary lg:px-5":
                        variant === "filled"
                })}
            >
                {children}
            </a>
        </Link>
    );
};

export default InternalLink;
