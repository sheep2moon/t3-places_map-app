import { useRouter } from "next/router";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import Button from "../common/Button";
import LoadingSpinner from "../common/LoadingSpinner";
import Modal from "../common/Modal";

type DeletePlaceProps = {
    id: string;
};

const DeletePlace = ({ id }: DeletePlaceProps) => {
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const { mutateAsync: deletePlace, isLoading } = trpc.useMutation("protectedPlace.deletePlace");

    const router = useRouter();

    const handleDelete = async () => {
        await deletePlace({ id });
        setIsConfirmationOpen(false);
        router.push("/");
    };

    return (
        <div>
            <Button className="ml-auto mt-4 w-fit " onClick={() => setIsConfirmationOpen(true)}>
                Usuń miejsce
            </Button>
            <Modal isModalOpen={isConfirmationOpen} close={() => setIsConfirmationOpen(false)}>
                <div className="flex flex-col items-center">
                    <div className="mb-4 text-xl text-primary">Usunąc miejsce?</div>
                    <div className="flex gap-1">
                        <Button onClick={() => setIsConfirmationOpen(false)}>Anuluj</Button>
                        <Button onClick={handleDelete}>{isLoading ? <LoadingSpinner /> : "Tak,usuń"}</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default DeletePlace;
