import type { NextPage } from "next";
import dynamic from "next/dynamic";
import PlaceDetailsModal from "../../modules/places-map/details-modal/PlaceDetailsModal";

const Home: NextPage = () => {
    const PlacesMap = dynamic(() => import("../../modules/places-map/PlacesMap"), { ssr: false });

    return (
        <div className="h-container-screen w-screen max-w-screen-large">
            <PlacesMap />
            <PlaceDetailsModal />
        </div>
    );
};

export default Home;
