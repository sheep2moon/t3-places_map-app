import clsx from "clsx";
import Image from "next/image";
import React from "react";

type UserAvatarProps = {
    image: string;
    size?: number;
};

const UserAvatar = ({ image, size = 10 }: UserAvatarProps) => {
    return (
        <div className={clsx(" relative aspect-square")} style={{ width: size * 4 }}>
            <div className="absolute inset-0 rounded-sm" />
            <Image src={image} alt="awatar" layout="fill" className="rounded-sm " />
        </div>
    );
};

export default UserAvatar;
