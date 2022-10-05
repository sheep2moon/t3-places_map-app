import React from "react";
import { Popover } from "@headlessui/react";
import { GiPalette } from "react-icons/gi";

const palette = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#4D33aF"
];

const ColorSelector = ({ select }: { select: (c: string) => void }) => {
    return (
        <div>
            <Popover className="">
                <Popover.Button className="rounded-full bg-primary p-1 text-4xl text-secondary">
                    <GiPalette />
                </Popover.Button>
                <Popover.Panel className="fixed inset-2 z-50 flex items-center justify-center rounded-md border border-secondary bg-black/80">
                    {({ close }) => (
                        <div className="grid w-72 grid-cols-6 gap-1  rounded-md border-4 border-primary bg-primary">
                            {palette.map(color => (
                                <div
                                    key={color}
                                    className={`h-11 w-11 rounded-sm bg-[${color}]`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => {
                                        select(color);
                                        close();
                                    }}
                                ></div>
                            ))}
                        </div>
                    )}
                </Popover.Panel>
            </Popover>
        </div>
    );
};

export default ColorSelector;
