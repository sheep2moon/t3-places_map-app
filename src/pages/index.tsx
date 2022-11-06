import type { NextPage } from "next";
import { useState } from "react";
import dynamic from "next/dynamic";
import PlaceTypeFilter from "../modules/places-map/PlaceTypeFilter";

const Home: NextPage = () => {
    const PlacesMap = dynamic(() => import("../modules/places-map/PlacesMap"));
    const [selectedTypeId, setSelectedTypeId] = useState("");
    return (
        <>
            <PlaceTypeFilter selectTypeId={setSelectedTypeId} selectedTypeId={selectedTypeId} />
            <PlacesMap />
        </>
    );
};

export default Home;
