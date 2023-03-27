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
                    <a href="javascript:void(0)" className="inline-block rounded-lg bg-white py-2 px-4 font-medium text-gray-800 shadow-md duration-150 hover:bg-gray-100 hover:shadow-none active:bg-gray-200">
                        Learn more
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AddPlaceEncouragement;

//TODO - REDIRECT TO SIGNIN IF NO AUTHORIZED
//href="/auth/signin?redirect-to=add-place
