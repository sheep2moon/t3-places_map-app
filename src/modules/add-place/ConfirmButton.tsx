import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../../utils/trpc";
import { useNewPlaceStore } from "../../zustand/newPlaceStore";
import Button from "../common/Button";

const ConfirmButton = () => {
    const { mutateAsync: createPlace, isLoading } = trpc.useMutation("protectedPlace.createPlace");
    const { displayName, description, lat, lng, placeTypeId } = useNewPlaceStore(state => state);
    const router = useRouter();

    const handleCreate = async () => {
        if (displayName && description && lat && lng && placeTypeId) {
            const res = await createPlace({ description, displayName, lat, lng, placeTypeId });
            if (res.id) {
                router.push(`/user-places/${res.id}`);
            }
            console.log(res);
        } else {
            console.log("er");
        }
    };
    return (
        <div className="mx-auto mt-2 flex max-w-sm">
            <Button isLoading={isLoading} onClick={handleCreate}>
                Dalej
            </Button>
        </div>
    );
};

export default ConfirmButton;
