import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import Button from "../common/Button";
import InputText from "../common/InputText";

const NewRestaurant = ({ refetch }: { refetch: () => void }) => {
    const [name, setName] = useState("");
    const createRestaurant = trpc.useMutation(["restaurant.createRestaurant"]);
    const handleCreate = async () => {
        await createRestaurant.mutateAsync({ name });
        refetch();
    };
    return (
        <div>
            <h2 className="mb-4 text-center text-xl">Stwórz restauracje</h2>
            <InputText value={name} handleChange={e => setName(e.target.value)} name="name" label="Nazwa" />
            <Button className="mt-2" onClick={handleCreate} disabled={createRestaurant.isLoading}>
                Przejdź dalej
            </Button>
        </div>
    );
};

export default NewRestaurant;
