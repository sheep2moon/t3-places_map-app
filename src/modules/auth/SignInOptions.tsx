import { signIn } from "next-auth/react";
import React from "react";
import Button from "../common/Button";
import { FcGoogle } from "react-icons/fc";
import { FaDiscord } from "react-icons/fa";

const SignInOptions = () => {
    return (
        <div className="text-light">
            <h1 className="pb-4 text-xl">Zaloguj się przez:</h1>

            <div className="flex flex-col gap-2">
                <Button className="bg-[#5865F2] hover:bg-indigo-600" variant="secondary" onClick={() => signIn("discord")}>
                    <div className="flex items-center gap-2 text-light">
                        <span>Discord</span>
                        <FaDiscord className="text-amber- text-2xl" />
                    </div>
                </Button>
                <Button variant="secondary" onClick={() => signIn("google")}>
                    <div className="flex items-center gap-2">
                        <span className="font-bold">Google</span>
                        <FcGoogle className="text-2xl" />
                    </div>
                </Button>
            </div>
        </div>
    );
};

export default SignInOptions;
