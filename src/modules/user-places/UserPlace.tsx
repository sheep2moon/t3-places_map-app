import { Place, PlaceType } from "@prisma/client";
import Link from "next/link";
import React from "react";
import PlaceTypeIcon from "../place/PlaceTypeIcon";
import { FaArrowRight } from "react-icons/fa";

type UserPlaceProps = {
    place: Place;
    placeType: PlaceType;
};

const UserPlace = ({ place, placeType }: UserPlaceProps) => {
    return (
        <div className="flex w-full items-center rounded-sm bg-black/20 py-1 px-2">
            <PlaceTypeIcon placeType={placeType} size="sm" />
            <div className="ml-4">{place.displayName}</div>
            <Link href={`/user-places/${place.id}`}>
                <a className="ml-auto px-3">
                    <FaArrowRight />
                </a>
            </Link>
        </div>
    );
};

export default UserPlace;
