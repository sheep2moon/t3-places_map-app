import { signOut, useSession } from "next-auth/react";
import React from "react";
import SignInOptions from "../../modules/auth/SignInOptions";
import Button from "../../modules/common/Button";
import InternalLink from "../../modules/common/links/InternalLink";

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
            {!session && <SignInOptions />}
        </div>
    );
};

export default Signin;
