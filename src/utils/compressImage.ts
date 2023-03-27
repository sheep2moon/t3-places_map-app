export const compressImage = (file: File, quality = 0.6): Promise<Blob> => {
    return new Promise<Blob>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result as string;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const width = img.width;
                const height = img.height;
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob(
                        blob => {
                            if (blob) {
                                resolve(blob);
                            } else {
                                reject(new Error("Blob not created"));
                            }
                        },
                        "image/jpeg",
                        quality
                    );
                }
            };
        };
        reader.onerror = error => reject(error);
    });
};
