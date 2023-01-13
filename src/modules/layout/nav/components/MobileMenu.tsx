import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { NavLink } from "..";
import ThemeSwitch from "./ThemeSwitch";

type MobileMenuProps = {
    navLinks: NavLink[];
    close: () => void;
    isOpen: boolean;
};

const MobileMenu = ({ navLinks, isOpen, close }: MobileMenuProps) => {
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
                                <a onClick={close} className="flex items-center gap-2 text-3xl">
                                    {link.icon}
                                    <span>{link.title}</span>
                                </a>
                            </Link>
                        ))}
                    </div>
                    <ThemeSwitch />
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
