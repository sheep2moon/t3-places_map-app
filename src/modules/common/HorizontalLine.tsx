import React, { ReactNode } from "react";

const HorizontalLine = ({ children, className }: { children?: ReactNode; className?: string }) => {
    return (
        <div className={"inline-flex w-full items-center justify-center " + className}>
            <hr className="my-2 h-px w-full border-0 bg-indigo-300 dark:bg-indigo-900" />
            {children && <span className="block w-fit whitespace-nowrap px-3 font-medium text-dark dark:text-indigo-100">{children}</span>}
            <hr className="my-2 h-px w-full border-0 bg-indigo-300 dark:bg-indigo-900" />
        </div>
    );
};

export default HorizontalLine;
