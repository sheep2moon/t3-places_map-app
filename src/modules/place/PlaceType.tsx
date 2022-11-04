import { Place, PlaceType } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

type PlaceTypeProps = {
    placeType: PlaceType;
    isSelected?: boolean;
};

const PlaceType = ({ placeType, isSelected }: PlaceTypeProps) => {
    return (
        <div className="flex h-20 w-20 flex-col items-center rounded-md p-1 transition-all">
            <div className="relative h-12 w-12">
                <Image src={placeType.icon} alt="place thumbnail" layout="fill" />
            </div>
            <span className="text-sm">{placeType.title}</span>
        </div>
    );
};

export default PlaceType;
