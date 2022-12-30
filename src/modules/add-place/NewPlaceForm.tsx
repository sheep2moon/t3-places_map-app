import React from "react";
import { useNewPlaceStore } from "../../zustand/newPlaceStore";
import InputText from "../common/InputText";
import TextArea from "../common/TextArea";

const NewPlaceForm = () => {
    const { displayName, description, setDisplayName, setDescription } = useNewPlaceStore(state => state);

    return (
        <div>
            <div className="mt-4">
                <label htmlFor="displayed-name">Wyświetlana nazwa</label>
                <InputText className="mt-2" name="displayed-name" value={displayName} handleChange={e => setDisplayName(e.target.value)} />
            </div>
            <div className="mt-4">
                <label htmlFor="place-description">Opis miejsca</label>
                <TextArea className="mt-2" name="place-description" value={description} handleChange={e => setDescription(e.target.value)} />
            </div>
        </div>
    );
};

export default NewPlaceForm;
