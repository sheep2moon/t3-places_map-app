import { useSession } from "next-auth/react";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { IoLibrary } from "react-icons/io5";
import { TbTarget } from "react-icons/tb";
import { trpc } from "../../../utils/trpc";
import HorizontalLine from "../../common/HorizontalLine";
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
        <div className="mt-4 flex flex-col text-primary dark:text-light">
            <HorizontalLine>
                <span className="flex items-center gap-1 p-1 text-left text-base">
                    <IoLibrary />
                    Twoja biblioteka
                </span>
            </HorizontalLine>
            <div className="mt-4 flex gap-1 text-xs">
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
                    {visitedMutationLoading ? (
                        <div className="relative">
                            <LoadingSpinner size="small" />
                        </div>
                    ) : data?.visited.some(place => place.id === placeId) ? (
                        <>
                            <BsCheck className="text-lg text-emerald-500" />
                            Odwiedzone
                        </>
                    ) : (
                        <>
                            <TbTarget className="text-lg text-amber-400" />
                            Dodaj do odwiedzonych
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default UserActions;
