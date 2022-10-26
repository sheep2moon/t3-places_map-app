import { unstable_getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import InputText from "../../modules/common/InputText";
import PlaceMap from "../../modules/map/PlaceMap";
import SearchPlaceInput from "../../modules/map/SearchPlaceInput";
import { authOptions } from "../api/auth/[...nextauth]";

const LocalizationSettings = () => {
    const [placePosition, setPlacePosition] = useState<Position>();
    const [displayedName, setDisplayedName] = useState("");

    const PlaceMap = dynamic(() => import("../../modules/map/PlaceMap"));

    return (
        <div>
            <div className="flex-start flex  flex-col">
                <div>Wyszukaj na podstawie miasta/adresu/kodu pocztowego</div>
                <div className="flex flex-col">
                    <SearchPlaceInput setPosition={setPlacePosition} />
                    <PlaceMap placePosition={placePosition} setPosition={setPlacePosition} />
                </div>
                <div className="mt-4">
                    <InputText label="Wyświetlana nazwa" name="displayed-name" value={displayedName} handleChange={e => setDisplayedName(e.target.value)} />
                </div>
            </div>
        </div>
    );
};

export default LocalizationSettings;

export async function getServerSideProps(context: any) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions);
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
