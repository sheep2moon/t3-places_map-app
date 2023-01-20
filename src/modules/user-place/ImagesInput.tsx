import Image from "next/image";
import React, { useState } from "react";
import { uploadFile } from "../../server/common/uploadFile";
import { trpc } from "../../utils/trpc";
import LoadingSpinner from "../common/LoadingSpinner";

type InputFileProps = {
    placeId: string;
    refetch: () => void;
};
const ImageInput = ({ placeId, refetch }: InputFileProps) => {
    const [file, setFile] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const { mutateAsync: createPresignedUrl } = trpc.useMutation(["images.createPresignedUrl"]);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.currentTarget.files?.[0];
        if (file) {
            setFile(file);
            handleUploadImage(file);
        }
    };

    const handleUploadImage = async (file: any) => {
        setLoading(true);
        const imgData = (await createPresignedUrl({ placeId })) as any;
        const res = await uploadFile({ file, url: imgData.url, fields: imgData.fields });
        if (res.ok) {
            setFile(null);
            setLoading(false);
            refetch();
        }
    };

    return (
        <div className="w-full">
            <div className="relative aspect-square w-full rounded-md bg-light/5">
                <input className="absolute inset-0 z-10 cursor-pointer opacity-0" type="file" onChange={handleFileChange} />
                {file ? (
                    <div className="relative aspect-square w-full border">
                        <Image src={URL.createObjectURL(file)} alt="podgląd" layout="fill" />
                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 ">
                                <LoadingSpinner />
                            </div>
                        )}
                    </div>
                ) : (
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-xs">Kliknij aby wybrać zdjęcie</span>
                )}
            </div>
        </div>
    );
};

export default ImageInput;
