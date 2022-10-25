import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

// type RestaurantTabsProps = {};

const RestaurantTabs = () => {
    const router = useRouter();

    return (
        <div className="flex">
            <TabLink pathname={router.pathname} href="/restaurant/categories" title="Kategorie" />
            <TabLink pathname={router.pathname} href="/restaurant/products" title="Produkty" />
        </div>
    );
};

export default RestaurantTabs;

const TabLink = ({ href, title, pathname }: { href: string; title: string; pathname: string }) => {
    return (
        <Link href={href} passHref>
            <a className={clsx("px-4 py-2 text-center text-2xl last:border-l-0", { "border-b ": href === pathname })}>{title}</a>
        </Link>
    );
};
