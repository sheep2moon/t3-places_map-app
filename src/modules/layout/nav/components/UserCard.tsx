import { signOut } from "next-auth/react";
import React from "react";
import UserAvatar from "../../../common/UserAvatar";

type UserCardProps = {
    name: string | null | undefined;
    image: string | null | undefined;
};

const UserCard = ({ name, image }: UserCardProps) => {
    return (
        <div className="flex items-center gap-2">
            <div className="flex flex-col items-center ">
                <span className="text-lg font-semibold">{name}</span>
                <button className="text-sm text-secondary" onClick={() => signOut()}>
                    Wyloguj
                </button>
            </div>
            <UserAvatar image={image ?? ""} />
        </div>
    );
};

export default UserCard;
