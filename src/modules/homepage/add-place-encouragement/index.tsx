import React from "react";
import InternalLink from "../../common/links/InternalLink";

const AddPlaceEncouragement = () => {
    return (
        <section className="bg-dark py-14">
            <div className="mx-auto max-w-screen-xl justify-between  gap-x-12 px-4 md:flex md:px-8">
                <div className="max-w-xl">
                    <h3 className="text-3xl font-semibold text-white sm:text-4xl">Dołącz do naszej społeczności</h3>
                    <p className="mt-3 text-gray-300">
                        Stwórz konto już teraz, aby uzyskać pełny dostęp do wszystkich funkcji naszej aplikacji, w tym możliwość dodawania miejsc, komentowania i oceniania, a także tworzenia list ulubionych miejsc.
                    </p>
                </div>
                <div className="mt-4 flex-none md:mt-0">
                    <InternalLink href="/auth/signin">Zaloguj się</InternalLink>
                </div>
            </div>
        </section>
    );
};

export default AddPlaceEncouragement;

//TODO - REDIRECT TO SIGNIN IF NO AUTHORIZED
//href="/auth/signin?redirect-to=add-place
