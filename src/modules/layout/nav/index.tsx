import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { BiMapAlt } from "react-icons/bi";
import { RiMapPinAddLine } from "react-icons/ri";
import { VscLibrary } from "react-icons/vsc";
import SearchPlaceInput from "../../add-place/SearchPlaceInput";
import DesktopMenu from "./components/DesktopMenu";
import Hamburger from "./components/Hamburger";
import Logo from "./components/Logo";
import MobileMenu from "./components/MobileMenu";
import PlacesSearch from "./components/PlacesSearch";
import ThemeSwitch from "./components/ThemeSwitch";
import UserCard from "./components/UserCard";

export type NavLink = {
    title: string;
    href: string;
    needAuth: boolean;
    icon: React.ReactNode;
};

const navLinks: NavLink[] = [
    { title: "Dodaj miejsce", href: "/add-place", needAuth: true, icon: <RiMapPinAddLine /> },
    { title: "Mapa miejsc", href: "/places-map", needAuth: false, icon: <BiMapAlt /> },
    { title: "Moje miejsca", href: "/user-places", needAuth: true, icon: <VscLibrary /> }
];

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const session = useSession();
    const isLoggedIn = !!session.data;
    const userMetadata = session.data?.user;

    return (
        <header className="fixed inset-x-0 top-0 z-[999999] flex h-16 items-center justify-between border-b border-primary/20 bg-light px-4 text-primary shadow-sm dark:border-dark dark:bg-stone-800 dark:text-light dark:shadow-stone-900/20">
            <Logo />
            <MobileMenu navLinks={navLinks} isOpen={isMenuOpen} close={() => setIsMenuOpen(false)} />
            <PlacesSearch />

            <div className="ml-auto flex items-center gap-2">
                <ThemeSwitch />
                <div className=" items-center gap-2">
                    {isLoggedIn ? (
                        <UserCard image={userMetadata?.image} name={userMetadata?.name} />
                    ) : (
                        <Link href="/auth/signin">
                            <a className="border-b text-sm text-secondary">Zaloguj się</a>
                        </Link>
                    )}
                </div>
                <Hamburger isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            </div>
        </header>
    );
};

export default Nav;
