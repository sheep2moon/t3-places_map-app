import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment } from "react";
import { GoTriangleLeft } from "react-icons/go";
import { getPlaceImageSrc } from "../../../utils/getImageSrc";
import { useEnlargedImageStore } from "../../../zustand/enlargedImageStore";

const ImageZoomModal = () => {
    const { isOpen, close, currentImageIndex, imageCollection, nextImage, previousImage } = useEnlargedImageStore();

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="absolute inset-0 z-[9999999]" onClose={close}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-auto">
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
                                <Dialog.Panel className="relative aspect-video w-screen max-w-5xl transform overflow-hidden rounded-sm bg-black/90 text-left align-middle shadow-xl transition-all">
                                    <Image className="object-contain" alt="powiększone zdjęcie miejsca" src={getPlaceImageSrc(imageCollection[currentImageIndex]?.id || "")} fill />
                                    <button onClick={previousImage} className="absolute left-0 top-0 bottom-0 flex w-16 items-center justify-center bg-light/5 hover:bg-light/10">
                                        <GoTriangleLeft className="text-3xl" />
                                    </button>
                                    <button onClick={nextImage} className="absolute right-0 top-0 bottom-0 flex w-16 items-center justify-center bg-light/5 hover:bg-light/10">
                                        <GoTriangleLeft className="rotate-180 text-3xl" />
                                    </button>
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
