import Link from "next/link";
import React from "react";

const Logo = () => {
    return (
        <div>
            <Link href="/">
                <a className="mr-8 flex items-center gap-1">
                    {/* <div className="relative h-10 w-10"><Image src={logoSrc} alt="logo strony" objectFit="contain" layout="fill" /></div> */}
                    <p className="font-pinstripe text-base font-normal sm:text-xl lg:text-2xl">PLECAK</p>
                </a>
            </Link>
        </div>
    );
};

export default Logo;
