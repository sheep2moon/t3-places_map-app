import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { trpc } from "../../utils/trpc";
import { NewPlaceFormErrors, useNewPlaceStore } from "../../zustand/newPlaceStore";
import Button from "../common/Button";

const ConfirmButton = () => {
    const { mutateAsync: createPlace, isLoading } = trpc.useMutation("protectedPlace.createPlace");
    const { displayName, description, lat, lng, placeTypeId, isPaid, prices, setErrors } = useNewPlaceStore(state => state);
    const router = useRouter();

    const handleCreate = async () => {
        const errorFields: NewPlaceFormErrors = new Map();
        if (!displayName) errorFields.set("name", true);
        if (!description) errorFields.set("description", true);
        if (!lat || !lng) errorFields.set("position", true);
        if (!placeTypeId) errorFields.set("type", true);
        if (errorFields.size === 0) {
            const res = await createPlace({ description, displayName, lat, lng, placeTypeId, isPaid, prices: JSON.stringify(prices) });
            if (res.id) {
                router.push(`/user-places/${res.id}`);
            }
        } else {
            toast("Formularz zawiera błędy!", { position: "bottom-right", type: "error", autoClose: 2000 });
            setErrors(errorFields);
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
