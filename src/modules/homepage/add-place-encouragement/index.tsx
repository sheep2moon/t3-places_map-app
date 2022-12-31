import Link from "next/link";
import React from "react";
import Button from "../../common/Button";

const AddPlaceEncouragement = () => {
    return (
        <div>
            <h2>Znasz ciekawe miejsce?</h2>
            <Link href="/auth/signin?redirect-to=add-place">
                <a>Dodaj miejsce</a>
            </Link>
        </div>
    );
};

export default AddPlaceEncouragement;
