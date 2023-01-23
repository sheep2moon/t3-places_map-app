import React from "react";
import { FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import InternalLink from "../../common/links/InternalLink";

const LoginEncourage = () => {
    return (
        <div className="mt-4 flex flex-col items-center gap-2">
            <p className="text-sm font-semibold">Odblokuj dodatkowe funkcje oraz możliwości oceniania.</p>
            <div className="flex w-full justify-center gap-2 text-xl">
                <FaDiscord className="text-[#7289da]" />
                <FcGoogle />
            </div>
            <InternalLink href="/auth/signin">Zaloguj się</InternalLink>
        </div>
    );
};

export default LoginEncourage;
