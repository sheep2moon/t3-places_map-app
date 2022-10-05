import Link from "next/link";
import React from "react";

// type RestaurantTabsProps = {};

const RestaurantTabs = () => {
    return (
        <div className="flex">
            <TabLink href="/restaurant/categories" title="Kategorie" />
            <TabLink href="/restaurant/products" title="Produkty" />
        </div>
    );
};

export default RestaurantTabs;

const TabLink = ({ href, title }: { href: string; title: string }) => {
    return (
        <Link href={href} passHref>
            <a className=" border border-secondary px-4 py-2 text-center text-2xl last:border-l-0">{title}</a>
        </Link>
    );
};
