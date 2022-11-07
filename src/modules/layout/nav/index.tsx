import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import useDarkMode from "../../../lib/hooks/useDarkMode";
import Button from "../../common/Button";
import LoadingSpinner from "../../common/LoadingSpinner";
import UserAvatar from "../../common/UserAvatar";
import DesktopMenu from "./components/DesktopMenu";
import Hamburger from "./components/Hamburger";
import Logo from "./components/Logo";
import MobileMenu from "./components/MobileMenu";
import ThemeSwitch from "./components/ThemeSwitch";
import UserCard from "./components/UserCard";

type navLink = {
    title: string;
    href: string;
    needAuth: boolean;
};

const navLinks: navLink[] = [
    { title: "Dodaj miejsce", href: "/add-place", needAuth: true },
    { title: "Wszystkie miejsca", href: "/places-map", needAuth: false },
    { title: "Moje miejsca", href: "/user-places", needAuth: true }
];

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const session = useSession();
    const isLoggedIn = !!session.data;
    const userMetadata = session.data?.user;

    return (
        <header className="fixed inset-x-0 top-0 z-[999999] flex h-16 items-center justify-between bg-light px-4 text-primary shadow-sm shadow-slate-50/20 dark:bg-primary dark:text-light">
            <Logo />
            <MobileMenu navLinks={navLinks} isOpen={isMenuOpen} close={() => setIsMenuOpen(false)} />
            <DesktopMenu navLinks={navLinks} />

            <Hamburger isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            <div className="hidden items-center gap-2 small:flex">
                <ThemeSwitch />

                {isLoggedIn ? (
                    <UserCard image={userMetadata?.image} name={userMetadata?.name} />
                ) : (
                    <Link href="/auth/signin">
                        <a className="rounded-sm border border-secondary py-2 px-4">Zaloguj się</a>
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Nav;
