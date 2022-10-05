import React, { useState } from "react";
import Button from "../../common/Button";
import ColorSelector from "../../common/color-selector";
import InputFile from "../../common/InputFile";
import InputText from "../../common/InputText";

const NewCategory = () => {
    const [name, setName] = useState("");
    const [categoryColor, setCategoryColor] = useState("#9f9f9f");
    const [file, setFile] = useState(null);
    return (
        <div className="text-light">
            <h2 className=" text-center text-xl">Kategorie</h2>
            <label htmlFor="name">Wprowadź nazwę oraz wybierz kolor</label>
            <div className="flex items-center gap-2 rounded-md p-2" style={{ backgroundColor: categoryColor }}>
                <ColorSelector select={setCategoryColor} />
                <InputText value={name} handleChange={e => setName(e.target.value)} name="name" />
            </div>
            <Button className="mt-2">Dodaj</Button>
        </div>
    );
};

export default NewCategory;
