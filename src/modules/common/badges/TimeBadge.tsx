import React, { ReactNode } from "react";

const TimeBadge = ({ children }: { children: ReactNode | string }) => {
    return (
        <span className="inline-flex w-fit items-center rounded bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-primary dark:bg-dark dark:text-light dark:shadow-sm dark:shadow-black">
            <svg aria-hidden="true" className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
            </svg>
            {children}
        </span>
    );
};

export default TimeBadge;
