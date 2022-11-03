type uploadFileArgs = {
    file: any;
    url: string;
    fields: any;
};

export const uploadFile = async ({ file, url, fields }: uploadFileArgs) => {
    const data = {
        ...fields,
        "Content-Type": file.type,
        file
    };
    const formData = new FormData();
    for (const name in data) {
        formData.append(name, data[name]);
    }

    await fetch(url, {
        method: "POST",
        body: formData
    });
};
