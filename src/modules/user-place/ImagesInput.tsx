import React, { useState } from "react";
import { uploadFile } from "../../server/common/uploadFile";
import { trpc } from "../../utils/trpc";
import InputFile from "../common/InputFile";

type ImageInputProps = {
    placeId: string;
};

const ImageInput = ({ placeId }: ImageInputProps) => {
    const [file, setFile] = useState();

    const { mutateAsync: createPresignedUrl } = trpc.useMutation(["images.createPresignedUrl"]);

    const handleUploadImage = async () => {
        if (file) {
            const imgData = (await createPresignedUrl()) as any;
            const imageId = imgData.idImage;

            await uploadFile({ file, url: imgData.url, fields: imgData.fields });
        }
    };

    return (
        <div className="max-w-[140px]">
            <InputFile file={file} setFile={setFile} />
        </div>
    );
};

export default ImageInput;
