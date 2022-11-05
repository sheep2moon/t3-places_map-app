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

    const res = await fetch(url, {
        method: "POST",
        body: formData
    });
    return res;
    console.log(res);
};
