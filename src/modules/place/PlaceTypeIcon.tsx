import { Place, PlaceType } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

type PlaceTypeProps = {
    placeType: PlaceType;
    isSelected?: boolean;
    size?: "sm" | "md" | "lg";
};

const PlaceTypeIcon = ({ placeType, isSelected, size = "md" }: PlaceTypeProps) => {
    return (
        <div className={clsx("flex aspect-square flex-col items-center rounded-md p-1 transition-all", { "w-8": size === "sm", "w-20": size === "md", "w-28": size === "lg" })}>
            <div className={clsx("relative aspect-square", { "w-6": size == "sm", "w-12": size == "md", "w-16": size == "lg" })}>
                <Image src={placeType.icon} alt="place thumbnail" layout="fill" />
            </div>
            <span className={clsx("text-sm", { hidden: size === "sm" })}>{placeType.title}</span>
        </div>
    );
};

export default PlaceTypeIcon;
