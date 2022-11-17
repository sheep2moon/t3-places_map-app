import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
    return (
        <div className="mt-6 p-2">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
                Odkryj ciekawe miejsca.
                <span className="sm:block"> Poszerz horyzonty. </span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">Szukaj oraz dodawaj nowe miejsca warte uwagi. Znajdziesz tutaj doskonałe miejsce na biwak, ognisko lub nowe łowisko.</p>
            <div className="mt-4 flex justify-center">
                <Link href="/places-map">
                    <a className="block w-32 rounded border border-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto">Zobacz mape</a>
                </Link>
            </div>
        </div>
    );
};

export default Home;
