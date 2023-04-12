import Link from "next/link";
import React from "react";
import { Rubik_Vinyl } from "@next/font/google";
import Image from "next/image";
import logoSrc from "../../../../assets/plecaklogo.svg";

const rubikVinyl = Rubik_Vinyl({ weight: "400", subsets: ["latin"] });

const Logo = () => {
    return (
        <div>
            <Link className="mr-8 flex items-center gap-1" href="/">
                {/* <div className="relative h-10 w-10"><Image src={logoSrc} alt="logo strony" objectFit="contain" layout="fill" /></div> */}
                {/* <p className={"font-pinstripe text-2xl font-normal text-secondary sm:text-3xl " + rubikVinyl.className}>PLECAK</p> */}
                <Image src={logoSrc} alt="logo aplikacji" className="w-36" />
            </Link>
        </div>
    );
};

export default Logo;
