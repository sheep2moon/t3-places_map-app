import React from "react";
import { clsx } from "clsx";

type TabsProps = {
    options: { name: string; value: string }[];
    label: string;
    value: string;
    setValue: (value: string) => void;
};

const Tabs = ({ options, label, value, setValue }: TabsProps) => {
    const handleTabClick = (value: string) => {
        setValue(value);
    };

    return (
        <div className="flex flex-col gap-2">
            <span>{label}</span>
            <div className="flex w-full">
                {options.map(option => (
                    <span className={clsx("bg-primary text-light w-full text-center cursor-pointer p-1", { "bg-light/20 text-light": value === option.value })} onClick={() => handleTabClick(option.value)} key={option.value}>
                        {option.name}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
