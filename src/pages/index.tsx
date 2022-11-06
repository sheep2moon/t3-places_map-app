import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Home: NextPage = () => {
    const PlacesMap = dynamic(() => import("../modules/homepage/PlacesMap"));
    return (
        <>
            <PlacesMap />
        </>
    );
};

export default Home;
