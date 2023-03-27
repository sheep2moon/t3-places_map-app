import React from "react";
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
    return (
        <footer className="flex h-12 w-full items-center justify-between bg-light px-4 text-2xs text-xs text-primary dark:bg-dark dark:text-light">
            <div className="w-full items-center justify-between sm:flex">
                <div className="text-sm">&copy; 2023 Plecak.</div>
                <a target="_blank" rel="noreferrer" className="text-3xl" href="https://github.com/sheep2moon">
                    <AiFillGithub />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
