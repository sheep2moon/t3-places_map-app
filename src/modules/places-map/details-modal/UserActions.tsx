import clsx from "clsx";
import { useSession } from "next-auth/react";
import React from "react";
import { trpc } from "../../../utils/trpc";
import Button from "../../common/Button";

type UserActionsProps = {
    placeId: string;
};

const UserActions = ({ placeId }: UserActionsProps) => {
    const session = useSession();
    const isLoggedIn = !!session.data;
    const ctx = trpc.useContext();
    const { data, isLoading } = trpc.useQuery(["user.getUserLibrary"]);
    const { mutateAsync: toggleWishlist, isLoading: wishlistMutationLoading } = trpc.useMutation(["user.toggleWishlistPlace"], { onSuccess: () => ctx.invalidateQueries("user.getUserLibrary") });
    const { mutateAsync: toggleVisited, isLoading: visitedMutationLoading } = trpc.useMutation(["user.toggleVisitedPlace"], { onSuccess: () => ctx.invalidateQueries("user.getUserLibrary") });

    if (!isLoggedIn || isLoading) return null;

    // const handleAddToWishlist = () => {
    //     if (data?.wishlist.some(place => place.id === placeId)) {
    //         removeFromWishList({ placeId });
    //     }
    //     addToWishlist({ placeId });
    // };

    const handleToggleWishlist = () => {
        toggleWishlist({ placeId });
    };
    const handleToggleVisited = () => {
        toggleVisited({ placeId });
    };

    return (
        <div className="flex gap-2 text-primary">
            <button onClick={handleToggleWishlist} className={clsx("w-full bg-secondary", { "bg-emerald-200": data?.wishlist.some(place => place.id === placeId) })}>
                Ulubione
            </button>
            <button onClick={handleToggleVisited} className={clsx("w-full bg-secondary", { "bg-emerald-200": data?.visited.some(place => place.id === placeId) })}>
                Chce odwiedzić
            </button>
        </div>
    );
};

export default UserActions;
