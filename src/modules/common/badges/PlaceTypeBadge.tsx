import { PlaceType } from "@prisma/client";
import clsx from "clsx";
import React from "react";
import PlaceTypeIcon from "../../place/PlaceTypeIcon";

type PlaceTypeBadge = {
    placeType: PlaceType;
    size: ShorthandSize;
};

const PlaceTypeBadge = ({ placeType, size = "sm" }: PlaceTypeBadge) => {
    return (
        <div className="flex items-center gap-2 text-sm">
            <span>
                <PlaceTypeIcon size={size} placeType={placeType} />
            </span>
            <span className={clsx("", { "text-base": size === "sm", "text-lg": size === "md", "text-xl": size === "lg" })}>{placeType.title}</span>
        </div>
    );
};

export default PlaceTypeBadge;
