import React from "react";
import { AiFillHome } from "react-icons/ai";
import InternalLink from "../modules/common/links/InternalLink";

const NotFound = () => {
    return (
        <div className="mx-auto flex h-screen max-w-screen-xl items-center justify-start px-4 md:px-8">
            <div className="mx-auto max-w-lg space-y-4 text-center">
                <h3 className="text-4xl font-semibold text-gray-300 sm:text-5xl">BŁĄD 404</h3>
                <p className="text-gray-400">Przepraszamy, strona której szukasz nie istnieje.</p>
                <InternalLink className="flex gap-2" href="/">
                    Strona Główna
                    <AiFillHome className="" />
                </InternalLink>
            </div>
        </div>
    );
};

export default NotFound;
