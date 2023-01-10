import Link from "next/link";
import React from "react";

const AddPlaceEncouragement = () => {
    return (
        <div className="mt-8 flex flex-col items-center">
            <h2 className="bg-gradient-to-r from-green-800 via-blue-500 to-purple-800 bg-clip-text pb-4 text-center text-2xl font-extrabold text-transparent dark:from-green-300 dark:to-purple-500">Znasz ciekawe miejsce?</h2>
            <Link href="/add-place">
                <a className="mt-4 bg-secondary px-4 py-2 text-dark">Dodaj miejsce</a>
            </Link>
        </div>
    );
};

export default AddPlaceEncouragement;

//TODO - REDIRECT TO SIGNIN IF NO AUTHORIZED
//href="/auth/signin?redirect-to=add-place
