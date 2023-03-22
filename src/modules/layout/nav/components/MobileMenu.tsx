import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { NavLink } from "..";
import ThemeSwitch from "./ThemeSwitch";

type MobileMenuProps = {
  navLinks: NavLink[];
  close: () => void;
  isOpen: boolean;
  isLoggedIn: boolean;
};

const MobileMenu = ({
  navLinks,
  isOpen,
  close,
  isLoggedIn,
}: MobileMenuProps) => {
  return (
    <div
      className={clsx(
        "fixed inset-x-0 top-16 bottom-0 z-50 bg-gradient-to-br from-light to-secondary p-2 text-dark transition dark:from-primary dark:to-dark dark:text-secondary",
        {
          "translate-x-0": isOpen,
          "translate-x-full": !isOpen,
        }
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div className="flex flex-col gap-8">
          <div className="grid gap-4">
            {navLinks.map((link) => {
              if ((isLoggedIn && link.needAuth) || !link.needAuth) {
                return (
                  <Link
                    href={link.href}
                    key={link.title}
                    onClick={close}
                    className="flex items-center gap-2 text-3xl"
                  >
                    <span className="text-indigo-800 dark:text-indigo-400">
                      {link.icon}
                    </span>
                    <span>{link.title}</span>
                  </Link>
                );
              }
              return null;
            })}
          </div>
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
