import { LatLng } from "leaflet";
import { unstable_getServerSession } from "next-auth";
import React, { useEffect, useState } from "react";

import RestaurantLayout from "../../modules/layout/dashboard";
import PlaceMap from "../../modules/place-settings/PlaceMap";
import SearchPlaceInput from "../../modules/place-settings/SearchPlaceInput";
import { authOptions } from "../api/auth/[...nextauth]";

export type Place = {
    placeId: number;
    displayName: string;
    position: LatLng;
};

const Restaurant = () => {
    const [place, setPlace] = useState<Place>();
    useEffect(() => {
        console.log(place);
    }, [place]);
    return (
        <RestaurantLayout>
            <div className="flex-start flex  flex-col">
                <div>Wprowadź adres</div>
                <div className="flex flex-col">
                    <SearchPlaceInput setPlace={setPlace} />
                    <PlaceMap place={place} setPlace={setPlace} />
                </div>
            </div>
        </RestaurantLayout>
    );
};

export default Restaurant;

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
