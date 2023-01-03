import type { NextPage } from "next";
import dynamic from "next/dynamic";
import PlaceTypeFilter from "../../modules/places-map/PlaceTypeFilter";
import PlaceDetailsModal from "../../modules/places-map/details-modal/PlaceDetailsModal";

const Home: NextPage = () => {
    const PlacesMap = dynamic(() => import("../../modules/places-map/PlacesMap"));

    return (
        <div className="w-full max-w-screen-lg px-2">
            <PlaceTypeFilter />
            <PlacesMap />
            <PlaceDetailsModal />
        </div>
    );
};

export default Home;
