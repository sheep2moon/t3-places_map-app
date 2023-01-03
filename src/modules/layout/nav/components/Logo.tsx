import Image from "next/image";
import Link from "next/link";
import React from "react";
import logoSrc from "../../../../assets/logo.svg";

const Logo = () => {
    return (
        <div>
            <Link href="/">
                <a className="mr-8 flex items-center gap-1">
                    <div className="relative h-10 w-10">
                        <Image src={logoSrc} alt="logo strony" objectFit="contain" layout="fill" />
                    </div>
                    <p className="font-pinstripe text-2xl font-normal">PLECAK</p>
                </a>
            </Link>
        </div>
    );
};

export default Logo;
