import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { BiMapAlt } from "react-icons/bi";
import { RiMapPinAddLine } from "react-icons/ri";
import { VscLibrary } from "react-icons/vsc";
import InternalLink from "../../common/links/InternalLink";
import Hamburger from "./components/Hamburger";
import Logo from "./components/Logo";
import MobileMenu from "./components/MobileMenu";
import PlacesSearch from "../../search-places-modal/PlacesSearch";
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
        <header className="fixed inset-x-0 top-0 z-[999999] h-16 border-b border-primary/20 bg-light px-2 text-primary shadow-sm dark:border-dark dark:bg-stone-800 dark:text-light dark:shadow-stone-900/20 lg:px-4">
            <div className="mx-auto flex h-full max-w-screen-large items-center justify-between">
                <Logo />
                <MobileMenu navLinks={navLinks} isOpen={isMenuOpen} close={() => setIsMenuOpen(false)} />
                <PlacesSearch />

                <div className="ml-2 flex h-full items-center gap-2 lg:ml-4">
                    {isLoggedIn ? (
                        <UserCard image={userMetadata?.image} name={userMetadata?.name} />
                    ) : (
                        <InternalLink variant="filled" href="/auth/signin">
                            Zaloguj się
                        </InternalLink>
                    )}
                    <Hamburger isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                </div>
            </div>
        </header>
    );
};

export default Nav;
