import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { IoIosArrowBack } from "react-icons/io";

type ModalProps = {
    isModalOpen: boolean;
    close: () => void;
    children: React.ReactNode;
};

const ModalContainer = ({ isModalOpen, close, children }: ModalProps) => {
    return (
        <>
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[9999]" onClose={close}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-light bg-opacity-50 dark:bg-black/50" />
                    </Transition.Child>

                    <div className="fixed right-0 top-16 bottom-0  shadow-md shadow-black/50">
                        <div className="flex h-[calc(100vh_-_4rem)] items-center justify-center overflow-y-auto text-center">
                            <Transition.Child as={Fragment} enter="ease-out duration-100" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <Dialog.Panel className="relative h-full w-screen transform bg-light align-middle shadow-xl transition-all dark:bg-primary  md:max-w-[480px]">
                                    <button onClick={close} className="absolute left-4 top-4 z-10 flex h-12 w-12 items-center justify-start rounded-full bg-stone-800 text-secondary shadow-sm shadow-white/40 ">
                                        <IoIosArrowBack className="ml-2 text-3xl" />
                                    </button>
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
