import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

type SearchModalContainerProps = {
    isModalOpen: boolean;
    close: () => void;
    children: React.ReactNode;
};

const SearchModalContainer = ({ isModalOpen, close, children }: SearchModalContainerProps) => {
    return (
        <>
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[9999]" onClose={close}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-light bg-opacity-50 dark:bg-black/50" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className=" flex h-full w-full items-center justify-center pt-16 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="flex h-full w-full flex-col bg-light p-2 transition-all dark:bg-dark small:p-6">{children}</Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default SearchModalContainer;
