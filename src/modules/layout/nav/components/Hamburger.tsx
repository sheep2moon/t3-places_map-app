import React from "react";

const lineStyles = "h-1 w-8 my-1 rounded-full bg-light transition ease transform duration-300";

const Hamburger = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <div className="group flex h-12 w-12 flex-col items-center justify-center">
            <div className={`${lineStyles} ${isOpen ? "translate-y-3 rotate-45 opacity-50 group-hover:opacity-100" : "opacity-50 group-hover:opacity-100"}`} />
            <div className={`${lineStyles} ${isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"}`} />
            <div className={`${lineStyles} ${isOpen ? "-translate-y-3 -rotate-45 opacity-50 group-hover:opacity-100" : "opacity-50 group-hover:opacity-100"}`} />
        </div>
    );
};

export default Hamburger;
