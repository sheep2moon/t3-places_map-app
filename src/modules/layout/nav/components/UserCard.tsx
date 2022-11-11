import { signOut } from "next-auth/react";
import React from "react";
import UserAvatar from "../../../common/UserAvatar";

type UserCardProps = {
    name: string | null | undefined;
    image: string | null | undefined;
};

const UserCard = ({ name, image }: UserCardProps) => {
    return (
        <div className="w flex items-center gap-2 rounded-md p-1">
            <div className="flex w-fit flex-col items-center">
                {/* <span className="text-lg font-semibold">{name}</span> */}
                {/* <button className="text-sm text-violet-900 dark:text-secondary" onClick={() => signOut()}>
                    Wyloguj
                </button> */}
            </div>
            <UserAvatar size={10} image={image ?? ""} />
        </div>
    );
};

export default UserCard;
