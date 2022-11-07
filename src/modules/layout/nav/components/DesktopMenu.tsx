import Link from "next/link";
import React from "react";

type DesktopMenuProps = {
    navLinks: { title: string; href: string; needAuth: boolean }[];
};

const DesktopMenu = ({ navLinks }: DesktopMenuProps) => {
    return (
        <div className="hidden gap-2 small:flex">
            {navLinks.map(link => (
                <Link href={link.href} key={link.title}>
                    <a className="p-2 transition-all hover:text-secondary">{link.title}</a>
                </Link>
            ))}
        </div>
    );
};

export default DesktopMenu;
