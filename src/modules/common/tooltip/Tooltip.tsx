import clsx from "clsx";
import React, { useState } from "react";

type TooltipProps = {
    direction?: Direction;
    content: React.ReactNode | string;
    children: React.ReactNode;
};

const Tooltip = ({ direction = "top", content, children }: TooltipProps) => {
    const [active, setActive] = useState(false);

    const handleMouseEnter = () => {
        setActive(true);
    };

    const handleMouseLeave = () => {
        setActive(false);
    };

    return (
        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {active && (
                <div
                    className={clsx("absolute z-[999] rounded-md p-1 text-justify shadow-md dark:bg-black dark:text-secondary dark:shadow-black", {
                        "-top-4 -translate-y-full": direction === "top",
                        "top-full translate-y-4 ": direction === "bottom"
                    })}
                >
                    {content}
                </div>
            )}
            {children}
        </div>
    );
};

export default Tooltip;
