import dynamic from "next/dynamic";
import React, { useState } from "react";
import ImageInput from "../../modules/add-place/ImagesInput";
import NewPlaceForm from "../../modules/add-place/NewPlaceForm";
import Button from "../../modules/common/Button";
import InputText from "../../modules/common/InputText";
import { useNewPlaceStore } from "../../zustand/newPlaceStore";

const LocalizationSettings = () => {
    const PlaceMap = dynamic(() => import("../../modules/add-place/NewPlaceMap"));
    const [step, setStep] = useState(1);

    return (
        <div className="flex-start flex w-full flex-col">
            {step === 1 && (
                <div className="mx-auto flex flex-col">
                    <PlaceMap />
                </div>
            )}
            {step === 2 && (
                <div className="mx-auto w-full max-w-lg">
                    <NewPlaceForm />
                    <div className="mt-4">
                        <span className="mb-2 block">Dodaj zdjęcia</span>
                        <div>
                            <ImageInput />
                        </div>
                    </div>
                </div>
            )}
            <div className="mx-auto mt-2 flex max-w-sm">
                <Button onClick={() => setStep(2)}>Dalej</Button>
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
