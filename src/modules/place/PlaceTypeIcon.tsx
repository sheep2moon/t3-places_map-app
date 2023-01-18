import { PlaceType } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

type PlaceTypeProps = {
    placeType: PlaceType;
    size?: ShorthandSize;
    className?: string;
};

const PlaceTypeIcon = ({ placeType, size = "md", className }: PlaceTypeProps) => {
    return (
        <div className={clsx("relative flex aspect-square flex-col items-center rounded-md transition-all " + className, { "w-8": size === "sm", "w-14": size === "md", "w-20 lg:w-28": size === "lg" })}>
            <Image src={placeType.icon} alt="place thumbnail" layout="fill" />
        </div>
    );
};

export default PlaceTypeIcon;
