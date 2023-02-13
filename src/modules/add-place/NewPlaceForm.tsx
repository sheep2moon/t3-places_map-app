import React from "react";
import { useNewPlaceStore } from "../../zustand/newPlaceStore";
import RequiredField from "../common/badges/RequiredField";
import InputText from "../common/InputText";
import Label from "../common/Label";
import TextArea from "../common/TextArea";

const NewPlaceForm = () => {
    const { displayName, description, setDisplayName, setDescription, errors, setError } = useNewPlaceStore(state => state);

    return (
        <div>
            <div className="mt-4">
                <Label isError={errors.get("name")} htmlFor="displayed-name">
                    <div className="flex items-center gap-2">
                        <span>Wyświetlana nazwa</span>
                        {errors.get("name") && <RequiredField />}
                    </div>
                </Label>
                <InputText onFocus={() => setError("name", false)} className="mt-2" name="displayed-name" value={displayName} handleChange={e => setDisplayName(e.target.value)} />
            </div>
            <div className="mt-4">
                <Label isError={errors.get("description")} htmlFor="place-description">
                    <div className="flex items-center gap-2">
                        <span>Opis miejsca</span>
                        {errors.get("description") && <RequiredField />}
                    </div>
                </Label>
                <TextArea onFocus={() => setError("description", false)} className="mt-2" name="place-description" value={description} handleChange={e => setDescription(e.target.value)} />
            </div>
        </div>
    );
};

export default NewPlaceForm;
