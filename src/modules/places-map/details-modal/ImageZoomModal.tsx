import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment } from "react";
import { getPlaceImageSrc } from "../../../utils/getImageSrc";
import { useEnlargedImageStore } from "../../../zustand/enlargedImageStore";

const ImageZoomModal = () => {
    const { isOpen, close, currentImageId } = useEnlargedImageStore();
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="absolute inset-0 z-[9999999]" onClose={close}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed top-1/2 -translate-y-1/2 overflow-y-auto">
                        <div className=" flex items-center justify-center text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="relative aspect-video w-screen transform overflow-hidden text-left align-middle shadow-xl transition-all">
                                    <Image objectFit="contain" alt="powiększone zdjęcie miejsca" src={getPlaceImageSrc(currentImageId)} layout="fill" />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default ImageZoomModal;
