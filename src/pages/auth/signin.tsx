import { signOut, useSession } from "next-auth/react";
import React from "react";
import Button from "../../modules/common/Button";
import { FcGoogle } from "react-icons/fc";
import { FaDiscord } from "react-icons/fa";
import { signIn } from "next-auth/react";

const Signin = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return;
    }

    return (
        <div className="h-container-screen flex flex-col items-center justify-center text-light">
            {session && (
                <div className="flex flex-col gap-2 p-4">
                    <p>Jesteś już zalogowany.</p>
                    <Button variant="outline" onClick={() => signOut()}>
                        Wyloguj się
                    </Button>
                </div>
            )}
            {!session && (
                <div className="relative text-light">
                    <h1 className="mb-8 bg-gradient-to-r from-indigo-600 via-indigo-400  to-indigo-500 bg-clip-text pb-4 text-center text-3xl font-extrabold text-transparent">Zaloguj się</h1>
                    <div className="bg-radial-dark absolute inset-0 -z-10 my-auto h-[200px]" />
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
            )}
        </div>
    );
};

export default Signin;
