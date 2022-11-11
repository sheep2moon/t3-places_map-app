import clsx from "clsx";
import Image from "next/image";
import React from "react";

type UserAvatarProps = {
    image: string;
    size?: number;
};

const UserAvatar = ({ image, size = 10 }: UserAvatarProps) => {
    return (
        <div className={clsx(" relative aspect-square rounded-full border-2 border-secondary")} style={{ width: size * 4 }}>
            {/* <div className="absolute inset-0 rounded-full bg-secondary p-1" /> */}
            <Image src={image} alt="awatar" layout="fill" className="rounded-full" />
        </div>
    );
};

export default UserAvatar;
