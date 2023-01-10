import React from "react";
import { useNewPlaceStore } from "../../zustand/newPlaceStore";
import InputText from "../common/InputText";
import Label from "../common/Label";
import TextArea from "../common/TextArea";

const NewPlaceForm = () => {
    const { displayName, description, setDisplayName, setDescription } = useNewPlaceStore(state => state);

    return (
        <div>
            <div className="mt-4">
                <Label htmlFor="displayed-name">Wyświetlana nazwa</Label>
                <InputText className="mt-2" name="displayed-name" value={displayName} handleChange={e => setDisplayName(e.target.value)} />
            </div>
            <div className="mt-4">
                <Label htmlFor="place-description">Opis miejsca</Label>
                <TextArea className="mt-2" name="place-description" value={description} handleChange={e => setDescription(e.target.value)} />
            </div>
        </div>
    );
};

export default NewPlaceForm;
