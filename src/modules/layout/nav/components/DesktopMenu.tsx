import Link from "next/link";
import React from "react";

type DesktopMenuProps = {
    navLinks: { title: string; href: string; needAuth: boolean }[];
};

const DesktopMenu = ({ navLinks }: DesktopMenuProps) => {
    return (
        <div className="hidden gap-2 small:flex">
            {navLinks.map(link => (
                <Link href={link.href} key={link.title} className="p-2 transition-all hover:text-secondary">
                    {link.title}
                </Link>
            ))}
        </div>
    );
};

export default DesktopMenu;
