import clsx from "clsx";
import { useSession } from "next-auth/react";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { IoLibrary } from "react-icons/io5";
import { TbTarget } from "react-icons/tb";
import { trpc } from "../../../utils/trpc";
import Button from "../../common/Button";
import LoadingSpinner from "../../common/LoadingSpinner";

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
        <div className="flex flex-col text-primary dark:text-light">
            <span className="flex items-center gap-1 p-1 text-left text-xs">
                <IoLibrary />
                Twoja biblioteka
            </span>
            <div className="flex gap-1 text-xs">
                <button disabled={wishlistMutationLoading} onClick={handleToggleWishlist} className=" flex w-full items-center justify-center gap-2 border py-1 dark:border-light/20 ">
                    {wishlistMutationLoading ? (
                        <div className="relative">
                            <LoadingSpinner size="small" />
                        </div>
                    ) : data?.wishlist.some(place => place.id === placeId) ? (
                        <>
                            <AiFillHeart className="text-lg text-rose-600" />
                            Ulubione
                        </>
                    ) : (
                        <>
                            <AiOutlineHeart className="text-lg" />
                            Dodaj do ulubionych
                        </>
                    )}
                </button>
                <button disabled={visitedMutationLoading} onClick={handleToggleVisited} className="flex w-full items-center justify-center gap-2 border py-1 dark:border-light/20">
                    {data?.visited.some(place => place.id === placeId) ? (
                        <>
                            <BsCheck className="text-lg text-emerald-500" />
                            Odwiedzone
                        </>
                    ) : (
                        <>
                            <TbTarget className="text-lg text-amber-400" />
                            Chce odwiedzić
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default UserActions;
