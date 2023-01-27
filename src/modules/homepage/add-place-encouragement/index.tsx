import React from "react";
import InternalLink from "../../common/links/InternalLink";

const AddPlaceEncouragement = () => {
    return (
        <div className="mt-8 flex flex-col items-center">
            <h2 className="bg-gradient-to-r from-indigo-600 via-indigo-400 to-indigo-500 bg-clip-text pb-4 text-center text-2xl font-extrabold text-transparent ">Znasz ciekawe miejsce?</h2>
            <InternalLink href="/add-place">Dodaj miejsce</InternalLink>
        </div>
    );
};

export default AddPlaceEncouragement;

//TODO - REDIRECT TO SIGNIN IF NO AUTHORIZED
//href="/auth/signin?redirect-to=add-place


