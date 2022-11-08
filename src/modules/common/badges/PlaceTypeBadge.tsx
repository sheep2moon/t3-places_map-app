import { PlaceType } from "@prisma/client";
import React from "react";
import PlaceTypeIcon from "../../place/PlaceTypeIcon";

const PlaceTypeBadge = ({ placeType }: { placeType: PlaceType }) => {
    return (
        <div className="flex items-center text-sm">
            <span>
                <PlaceTypeIcon size="sm" placeType={placeType} />
            </span>
            <span>{placeType.title}</span>
        </div>
    );
};

export default PlaceTypeBadge;
