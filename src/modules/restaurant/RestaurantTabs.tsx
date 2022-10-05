import Link from "next/link";
import React from "react";

// type RestaurantTabsProps = {};

const RestaurantTabs = () => {
    return (
        <div>
            <TabLink href="/restaurant/categories" />
        </div>
    );
};

export default RestaurantTabs;

const TabLink = ({ href }: { href: string }) => {
    return (
        <Link href={href} passHref>
            <a className="rounded-md border border-secondary px-4 py-2 text-center">Kategorie</a>
        </Link>
    );
};
