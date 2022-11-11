import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import UserCard from "./UserCard";

type MobileMenuProps = {
    navLinks: { title: string; href: string }[];
    close: () => void;
    isOpen: boolean;
};

const MobileMenu = ({ navLinks, isOpen, close }: MobileMenuProps) => {
    const session = useSession();
    const isLoggedIn = !!session.data;
    const userMetadata = session.data?.user;
    return (
        <div
            className={clsx("fixed inset-x-0 top-16 bottom-0 z-50 bg-gradient-to-br from-light to-violet-200 p-2 transition dark:from-primary dark:to-violet-900", { "translate-x-0": isOpen, "translate-x-full": !isOpen })}
            onClick={e => e.stopPropagation()}
        >
            <div className="flex h-full flex-col items-center justify-center gap-4">
                <div className="flex flex-col gap-8">
                    <div className="grid gap-4">
                        {navLinks.map(link => (
                            <Link href={link.href} key={link.title}>
                                <a onClick={close} className="text-2xl ">
                                    {link.title}
                                </a>
                            </Link>
                        ))}
                    </div>
                    {/* <div className="flex justify-center">
                        {isLoggedIn ? (
                            <UserCard image={userMetadata?.image} name={userMetadata?.name} />
                        ) : (
                            <Link href="/auth/signin">
                                <a className="rounded-sm border border-secondary py-2 px-4">Zaloguj się</a>
                            </Link>
                        )}
                    </div> */}
                    {/* <div className="mt-8 flex items-center gap-2">
                        <span>Przełącz motyw</span>
                        <ThemeSwitch />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
