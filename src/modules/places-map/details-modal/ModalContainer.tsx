import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import Button from "../../common/Button";

type ModalProps = {
    isModalOpen: boolean;
    close: () => void;
    children: React.ReactNode;
};

const ModalContainer = ({ isModalOpen, close, children }: ModalProps) => {
    return (
        <>
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[99999]" onClose={close}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-light bg-opacity-50 dark:bg-black/50" />
                    </Transition.Child>

                    <div className="fixed right-0 top-0 bottom-0 overflow-y-auto shadow-md shadow-black/50">
                        <div className="flex min-h-screen items-center justify-center pt-16 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-x-full"
                                enterTo="opacity-100 scale-100 translate-x-0"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="min-h-screen w-screen transform bg-light p-2 align-middle shadow-xl transition-all dark:bg-primary md:max-w-[400px]">
                                    <Button onClick={close} className="mb-2 ml-auto" variant="alternative">
                                        X
                                    </Button>
                                    {children}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default ModalContainer;
