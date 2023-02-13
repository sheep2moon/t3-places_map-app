import React from "react";
import { useNewPlaceStore } from "../../zustand/newPlaceStore";
import InputText from "../common/InputText";
import Label from "../common/Label";
import TextArea from "../common/TextArea";

const NewPlaceForm = () => {
    const { displayName, description, setDisplayName, setDescription, errors, setError } = useNewPlaceStore(state => state);

    return (
        <div>
            <div className="mt-4">
                <Label isError={errors.get("name")} htmlFor="displayed-name">
                    Wyświetlana nazwa
                </Label>
                <InputText onFocus={() => setError("name", false)} className="mt-2" name="displayed-name" value={displayName} handleChange={e => setDisplayName(e.target.value)} />
            </div>
            <div className="mt-4">
                <Label isError={errors.get("description")} htmlFor="place-description">
                    Opis miejsca
                </Label>
                <TextArea onFocus={() => setError("description", false)} className="mt-2" name="place-description" value={description} handleChange={e => setDescription(e.target.value)} />
            </div>
        </div>
    );
};

export default NewPlaceForm;
