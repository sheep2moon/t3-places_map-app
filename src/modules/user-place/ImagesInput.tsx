import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { uploadFile } from "../../server/common/uploadFile";
import { compressImage } from "../../utils/compressImage";
import { trpc } from "../../utils/trpc";
import { inferMutationOutput } from "../../utils/trpc";
import LoadingSpinner from "../common/LoadingSpinner";

type InputFileProps = {
    placeId: string;
    refetch: () => void;
};
const ImageInput = ({ placeId, refetch }: InputFileProps) => {
    const [file, setFile] = useState<File | null>(null);
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

    const handleUploadImage = async (file: File) => {
        let targetFile: File;
        let compressedBlob: Blob | null = null;
        if (file.size > 6 * 1024 * 1024) {
            setFile(null);
            toast("Zdjęcie za duże, maksymalny rozmiar to 6MB");
            return;
        }
        setLoading(true);
        if (file.size > 4 * 1024 * 1024) {
            console.log("wiecej niż 4MB");

            compressedBlob = await compressImage(file, 0.2);
        } else if (file.size > 2 * 1024 * 1024) {
            console.log("wiecej niż 2MB");
            compressedBlob = await compressImage(file, 0.4);
        } else if (file.size > 1 * 1024 * 1024) {
            console.log("wiecej niż 1MB");
            compressedBlob = await compressImage(file, 0.6);
        } else if (file.size > 0.5 * 1024 * 1024) {
            console.log("wiecej niż 0.5MB");
            compressedBlob = await compressImage(file, 0.8);
        }

        if (compressedBlob) {
            targetFile = new File([compressedBlob], "compressedImage", { type: "image/jpeg" });
        } else {
            targetFile = file;
        }
        const imgData: inferMutationOutput<"images.createPresignedUrl"> = await createPresignedUrl({ placeId });

        console.log(file);
        console.log(targetFile);

        const res = await uploadFile({ file: targetFile, url: imgData.url, fields: imgData.fields });
        if (res.ok) {
            setFile(null);
            setLoading(false);
            refetch();
        } else {
            setLoading(false);
            setFile(null);
            toast("error", { type: "error" });
        }
    };

    return (
        <div className="aspect-square w-full rounded-md bg-light/5 ">
            <label htmlFor="image-upload" className="flex h-full cursor-pointer  ring-light focus:ring-2">
                {file ? (
                    <div className="relative aspect-square w-full border">
                        <Image src={URL.createObjectURL(file)} alt="podgląd" fill />
                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 ">
                                <LoadingSpinner />
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <input className="peer w-0 opacity-0" id="image-upload" type="file" onChange={handleFileChange} />
                        <div className="flex h-full w-full flex-col items-center justify-center border-slate-50 ring-light peer-focus:border-2">
                            <svg aria-hidden="true" className="mb-3 h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <span className="text-md text-center">Kliknij aby wybrać zdjęcie</span>
                        </div>
                    </>
                )}
            </label>
        </div>
    );
};

export default ImageInput;
