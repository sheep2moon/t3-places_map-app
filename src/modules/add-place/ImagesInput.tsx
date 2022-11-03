import React, { useState } from "react";
import InputFile from "../common/InputFile";

const ImageInput = () => {
    const [file, setFile] = useState();
    return (
        <div className="max-w-[200px]">
            <InputFile file={file} setFile={setFile} />
        </div>
    );
};

export default ImageInput;
