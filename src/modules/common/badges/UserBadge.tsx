import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

const UserBadge = ({ user }: { user: User }) => {
    return (
        <div className="flex items-center space-x-2 rounded-sm p-1 text-xs">
            <div className="relative aspect-square h-4">
                <Image src={user.image ?? ""} className="rounded-sm" alt="awatar użytkownika" layout="fill" />
            </div>
            <div className="text-base font-medium dark:text-white">
                <div>{user.name}</div>
            </div>
        </div>
    );
};

export default UserBadge;
