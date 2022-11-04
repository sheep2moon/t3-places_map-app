import { useRouter } from "next/router";
import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import Button from "../common/Button";
import Modal from "../common/Modal";

const DeletePlace = ({ id }: { id: string }) => {
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const { mutateAsync: deletePlace } = trpc.useMutation("protectedPlace.deletePlace");
    const router = useRouter();

    const handleDelete = () => {
        deletePlace({ id });
        setIsConfirmationOpen(false);
        router.push("/");
    };

    return (
        <div>
            <Button className="ml-auto mt-4 w-fit" onClick={() => setIsConfirmationOpen(true)}>
                Usuń miejsce
            </Button>
            <Modal isModalOpen={isConfirmationOpen} close={() => setIsConfirmationOpen(false)}>
                <div className="flex flex-col items-center">
                    <div className="mb-4 text-2xl text-light">Usunąc miejsce?</div>
                    <div className="flex gap-1">
                        <Button onClick={() => setIsConfirmationOpen(false)}>Anuluj</Button>
                        <Button onClick={handleDelete}>Tak,usuń</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default DeletePlace;
