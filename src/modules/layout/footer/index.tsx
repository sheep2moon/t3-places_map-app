import Link from "next/link";
import React from "react";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="flex h-8 items-center justify-between bg-light px-4 text-2xs text-xs text-primary dark:bg-primary dark:text-light">
            <span className="">Aplikacja stworzona dla własnej satysfakcji</span>
            <a target="blank" href="https://github.com/sheep2moon" className=" font-lg flex items-center gap-2">
                <span>Zobacz kod</span>
                <BsGithub className="text-base" />
            </a>
        </footer>
    );
};

export default Footer;
