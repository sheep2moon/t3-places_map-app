import React from "react";

const lineStyles = "h-1 w-8 my-1 rounded-full bg-light transition ease transform duration-300";

type HamburgerProps = {
    isMenuOpen: boolean;
    setIsMenuOpen: (v: boolean) => void;
};

const Hamburger = ({ isMenuOpen, setIsMenuOpen }: HamburgerProps) => {
    return (
        <button className="ml-auto small:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="group flex h-12 w-12 flex-col items-center justify-center">
                <div className={`${lineStyles} ${isMenuOpen ? "translate-y-3 rotate-45 opacity-50 group-hover:opacity-100" : "opacity-50 group-hover:opacity-100"}`} />
                <div className={`${lineStyles} ${isMenuOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"}`} />
                <div className={`${lineStyles} ${isMenuOpen ? "-translate-y-3 -rotate-45 opacity-50 group-hover:opacity-100" : "opacity-50 group-hover:opacity-100"}`} />
            </div>
        </button>
    );
};

export default Hamburger;
