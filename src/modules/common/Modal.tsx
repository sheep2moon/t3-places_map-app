import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

type ModalProps = {
    isModalOpen: boolean;
    close: () => void;
    children: React.ReactNode;
};

const Modal = ({ isModalOpen, close, children }: ModalProps) => {
    return (
        <>
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={close}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-50" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className=" flex min-h-full items-center justify-center p-1 text-center small:p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="overflow h-full w-full max-w-md transform rounded-2xl bg-primary p-6 text-left align-middle shadow-xl transition-all">{children}</Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default Modal;
