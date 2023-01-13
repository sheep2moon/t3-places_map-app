import React from "react";
import InternalLink from "../../common/links/InternalLink";

const AddPlaceEncouragement = () => {
    return (
        <div className="mt-8 flex flex-col items-center">
            <h2 className="bg-gradient-to-r from-green-800 via-blue-500 to-purple-800 bg-clip-text pb-4 text-center text-2xl font-extrabold text-transparent dark:from-green-300 dark:to-purple-500">Znasz ciekawe miejsce?</h2>
            <InternalLink href="/add-place">Dodaj miejsce</InternalLink>
        </div>
    );
};

export default AddPlaceEncouragement;

//TODO - REDIRECT TO SIGNIN IF NO AUTHORIZED
//href="/auth/signin?redirect-to=add-place
