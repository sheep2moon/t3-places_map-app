import { Image } from "@prisma/client";
import create from "zustand";

type EnlargedImageStoreState = {
    isOpen: boolean;
    currentImageIndex: number;
    imageCollection: Image[];
    setImageCollection: ({ currentImageIndex, imageCollection }: { currentImageIndex: number; imageCollection: Image[] }) => void;
    open: () => void;
    close: () => void;
    nextImage: () => void;
    previousImage: () => void;
};

export const useEnlargedImageStore = create<EnlargedImageStoreState>(set => ({
    isOpen: false,
    currentImageIndex: 0,
    imageCollection: [],
    setImageCollection: ({ currentImageIndex, imageCollection }) => set(state => ({ ...state, currentImageIndex, imageCollection })),
    open: () => set(state => ({ ...state, isOpen: true })),
    close: () => set(state => ({ ...state, isOpen: false, currentImageId: "" })),
    nextImage: () => set(state => ({ ...state, currentImageIndex: state.currentImageIndex === state.imageCollection.length - 1 ? 0 : state.currentImageIndex + 1 })),
    previousImage: () => set(state => ({ ...state, currentImageIndex: state.currentImageIndex === 0 ? state.imageCollection.length - 1 : state.currentImageIndex - 1 }))
}));
