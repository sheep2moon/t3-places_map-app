import { signIn } from "next-auth/react";
import React from "react";
import Button from "../common/Button";
import { FcGoogle } from "react-icons/fc";
import { FaDiscord } from "react-icons/fa";

const SignInOptions = () => {
    return (
        <div className="text-light">
            <h1 className="pb-4 text-xl">Wybierz sposób:</h1>

            <div className=" flex flex-col gap-2">
                <button className="rounded-sm bg-[#5865F2] p-2 px-4 hover:bg-indigo-600 " onClick={() => signIn("discord")}>
                    <div className="flex items-center gap-2 text-light">
                        <FaDiscord className="text-amber- text-2xl" />
                        <span>Zaloguj przez Discord</span>
                    </div>
                </button>
                <button onClick={() => signIn("google")}>
                    <div className="flex items-center gap-2 rounded-sm bg-stone-200 p-2 px-4 text-dark">
                        <FcGoogle className="text-2xl" />
                        <span className="font-bold">Zaloguj przez Google</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default SignInOptions;
