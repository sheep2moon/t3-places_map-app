import type { NextPage } from "next";
import { BiMapAlt } from "react-icons/bi";
import InternalLink from "../modules/common/links/InternalLink";
import AddPlaceEncouragement from "../modules/homepage/add-place-encouragement";
import PlaceTypesList from "../modules/homepage/place-types-list/PlaceTypesList";
import RecentlyAddedPlaces from "../modules/homepage/recent-activity/RecentlyAddedPlaces";
import RecentlyAddedReviews from "../modules/homepage/recent-activity/RecentlyAddedReviews";

const Home: NextPage = () => {
    return (
        <div className="mt-6 w-full max-w-screen-large">
            <div className="mx-auto mb-6 max-w-screen-lg p-2">
                <h1 className="bg-gradient-to-r from-teal-800 via-indigo-500 to-indigo-800 bg-clip-text pb-4 text-center text-4xl font-extrabold text-transparent dark:from-indigo-600 dark:via-indigo-300 dark:to-indigo-500 sm:text-5xl">
                    Odkryj ciekawe miejsca.
                    <span className="sm:block"> Poszerz horyzonty. </span>
                </h1>
                <p className="mx-auto mt-4 max-w-md px-4 sm:text-xl sm:leading-relaxed lg:max-w-xl">Szukaj oraz dodawaj nowe miejsca warte uwagi. Znajdziesz tutaj doskonałe miejsce na biwak, ognisko lub nowe łowisko.</p>
                <div className="mt-4 flex justify-center">
                    <InternalLink href="/places-map" variant="filled">
                        <div className="flex items-center gap-1">
                            <BiMapAlt className="text-2xl" /> Zobacz mape
                        </div>
                    </InternalLink>
                </div>
            </div>
            <PlaceTypesList />
            <RecentlyAddedPlaces />
            <RecentlyAddedReviews />
            <AddPlaceEncouragement />
            <p className="my-12 px-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nam illo architecto unde tempore magni expedita, beatae doloribus veniam nihil culpa sapiente, sequi cum? Voluptate temporibus sunt quis accusamus quo. Lorem
                ipsum dolor, sit amet consectetur adipisicing elit. Quod sit vero quisquam illum rerum error nostrum saepe, perspiciatis tempore eos quis consectetur iure in ut soluta, ea animi eveniet iste!
            </p>
        </div>
    );
};
export default Home;
