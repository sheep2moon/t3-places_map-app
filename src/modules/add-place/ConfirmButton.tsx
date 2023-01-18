import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../../utils/trpc";
import { useNewPlaceStore } from "../../zustand/newPlaceStore";
import Button from "../common/Button";

const ConfirmButton = () => {
    const { mutateAsync: createPlace, isLoading } = trpc.useMutation("protectedPlace.createPlace");
    const { displayName, description, lat, lng, placeTypeId, isPaid, prices } = useNewPlaceStore(state => state);
    const router = useRouter();

    const handleCreate = async () => {
        if (displayName && description && lat && lng && placeTypeId && isPaid) {
            const res = await createPlace({ description, displayName, lat, lng, placeTypeId, isPaid, prices: JSON.stringify(prices) });
            if (res.id) {
                router.push(`/user-places/${res.id}`);
            }
        } else {
            console.log("TODO - handle form errors");
        }
    };
    return (
        <div className="mx-auto my-8 flex w-full justify-center">
            <Button variant="filled" className="h-10 w-full" isLoading={isLoading} onClick={handleCreate}>
                <p className="text-xl">Przejdź dalej</p>
            </Button>
        </div>
    );
};

export default ConfirmButton;
