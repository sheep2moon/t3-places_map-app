import React, { ReactNode } from "react";

const HorizontalLine = ({ children, className }: { children?: ReactNode; className?: string }) => {
    return (
        <div className={"inline-flex w-full items-center justify-center " + className}>
            <hr className="my-2 h-px w-full border-0 bg-gray-200 dark:bg-gray-700" />
            {children && <span className="absolute left-1/2 -translate-x-1/2 bg-light px-3 font-medium dark:bg-primary ">{children}</span>}
        </div>
    );
};

export default HorizontalLine;
