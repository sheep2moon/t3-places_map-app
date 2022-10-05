import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Hamburger from "./components/Hamburger";
import MobileMenu from "./components/MobileMenu";

type NavProps = {
    name: string | undefined | null;
    image: string | undefined | null;
    status: string;
};

type navLink = {
    title: string;
    href: string;
};

const navLinks: navLink[] = [
    { title: "Zaloguj", href: "/auth/signin" },
    { title: "Ustawienia", href: "/restaurant/settings" }
];

const Nav = ({ name, image, status }: NavProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const closeMobile = () => setMobileOpen(false);
    return (
        <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between bg-primary px-4 text-light shadow-sm shadow-slate-50/20">
            <button className="small:hidden" onClick={() => setMobileOpen(o => !o)}>
                <Hamburger isOpen={mobileOpen} />
            </button>
            {status === "authenticated" && (
                <div className="flex rounded-sm bg-secondary py-2 px-4 font-semibold text-zinc-900">
                    <Link href="/restaurant">
                        <a>Zarządzaj</a>
                    </Link>
                </div>
            )}
            <div className="hidden gap-2 small:flex">
                {navLinks.map(link => (
                    <Link href={link.href} key={link.title}>
                        <a className="p-2 transition-all hover:text-secondary">{link.title}</a>
                    </Link>
                ))}
            </div>
            <MobileMenu navLinks={navLinks} isOpen={mobileOpen} close={closeMobile} />
            {status === "loading" && <div>Loading...</div>}
            {status === "authenticated" && (
                <div className="flex items-center gap-2">
                    <div className="flex flex-col items-center ">
                        <span className="text-lg font-semibold">{name}</span>
                        <button className="text-sm text-secondary" onClick={() => signOut()}>
                            Wyloguj
                        </button>
                    </div>
                    <div className=" relative h-10 w-10">
                        <div className="absolute inset-0 rounded-md ring-1  ring-secondary" />
                        <Image src={image ?? ""} alt="awatar" layout="fill" className="rounded-lg " />
                    </div>
                </div>
            )}
            {status === "unauthenticated" && (
                <Link href="/auth/signin">
                    <a className="rounded-sm border border-secondary py-2 px-4">Zaloguj się</a>
                </Link>
            )}
        </header>
    );
};

export default Nav;
