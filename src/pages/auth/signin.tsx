import { signOut, useSession } from "next-auth/react";
import React from "react";
import SignInOptions from "../../modules/auth/SignInOptions";
import Button from "../../modules/common/Button";

const Signin = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return;
    }

    return (
        <div className="justify-centertext-light mt-4 flex flex-col items-center">
            {session && <Button onClick={() => signOut()}>Wyloguj się</Button>}
            {!session && <SignInOptions />}
        </div>
    );
};

export default Signin;
