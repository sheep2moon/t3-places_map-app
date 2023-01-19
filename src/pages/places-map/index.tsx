import type { NextPage } from "next";
import dynamic from "next/dynamic";
import PlaceTypeFilter from "../../modules/places-map/PlaceTypeFilter";
import PlaceDetailsModal from "../../modules/places-map/details-modal/PlaceDetailsModal";

const Home: NextPage = () => {
    const PlacesMap = dynamic(() => import("../../modules/places-map/PlacesMap"), { ssr: false });
    // const router = useRouter();

    // useEffect(() => {
    //     console.log(router.query);
    // }, []);

    return (
        <div className="h-container-screen w-screen max-w-screen-large">
            <PlaceTypeFilter />
            <PlacesMap />
            <PlaceDetailsModal />
        </div>
    );
};

export default Home;
