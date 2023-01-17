import { unstable_getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import ConfirmButton from "../../modules/add-place/ConfirmButton";
import NewPlaceForm from "../../modules/add-place/NewPlaceForm";
import PricesForm from "../../modules/add-place/PricesForm";
import SelectPlaceType from "../../modules/add-place/SelectPlaceType";
import { authOptions } from "../api/auth/[...nextauth]";

const LocalizationSettings = () => {
    const NewPlaceMap = dynamic(() => import("../../modules/add-place/NewPlaceMap"), { ssr: false });

    return (
        <div className="flex-start flex w-full flex-col">
            <div className="mx-auto flex w-full max-w-2xl flex-col">
                <NewPlaceMap />
                <NewPlaceForm />
                <PricesForm />
                <SelectPlaceType />
                <ConfirmButton />
            </div>
        </div>
    );
};

export default LocalizationSettings;

export async function getServerSideProps(context: any) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions);
    console.log(context);

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        };
    } else {
        return { props: {} };
    }
}
