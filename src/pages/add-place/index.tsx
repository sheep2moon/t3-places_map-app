import dynamic from "next/dynamic";
import React, { useState } from "react";
import ConfirmButton from "../../modules/add-place/ConfirmButton";
import ImageInput from "../../modules/add-place/ImagesInput";
import NewPlaceForm from "../../modules/add-place/NewPlaceForm";
import SelectPlaceType from "../../modules/add-place/SelectPlaceType";
import Button from "../../modules/common/Button";
import InputText from "../../modules/common/InputText";
import { trpc } from "../../utils/trpc";
import { useNewPlaceStore } from "../../zustand/newPlaceStore";

const LocalizationSettings = () => {
    const PlaceMap = dynamic(() => import("../../modules/add-place/NewPlaceMap"));

    return (
        <div className="flex-start flex w-full flex-col">
            <div className="mx-auto flex flex-col">
                <PlaceMap />
                <NewPlaceForm />
                <SelectPlaceType />
                <ConfirmButton />
            </div>
        </div>
    );
};

export default LocalizationSettings;

// export async function getServerSideProps(context: any) {
//     const session = await unstable_getServerSession(context.req, context.res, authOptions);
//     if (!session) {
//         return {
//             redirect: {
//                 destination: "/",
//                 permanent: false
//             }
//         };
//     } else {
//         return { props: {} };
//     }
// }
