import clsx from "clsx";
import Link from "next/link";
import React from "react";

type MobileMenuProps = {
    navLinks: { title: string; href: string }[];
    close: () => void;
    isOpen: boolean;
};

const MobileMenu = ({ navLinks, isOpen, close }: MobileMenuProps) => {
    return (
        <div className={clsx("from-primary fixed inset-x-0 top-16 bottom-0 z-50 bg-gradient-to-br to-indigo-900 p-2 transition", { "translate-x-0": isOpen, "translate-x-full": !isOpen })} onClick={e => e.stopPropagation()}>
            <div className="flex h-full flex-col items-center justify-center gap-4">
                {navLinks.map(link => (
                    <Link href={link.href} key={link.title}>
                        <a onClick={close} className="text-2xl hover:border-b">
                            {link.title}
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MobileMenu;
