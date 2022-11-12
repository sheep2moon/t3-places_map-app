import type { NextPage } from "next";
import dynamic from "next/dynamic";
import PlaceTypeFilter from "../../modules/places-map/PlaceTypeFilter";
import PlaceDetailsModal from "../../modules/places-map/details-modal/PlaceDetailsModal";

const Home: NextPage = () => {
    const PlacesMap = dynamic(() => import("../../modules/places-map/PlacesMap"));

    return (
        <>
            <PlaceTypeFilter />
            <PlacesMap />
            <PlaceDetailsModal />
        </>
    );
};

export default Home;
