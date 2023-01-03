import create from "zustand";

type EnlargedImageStoreState = {
    isOpen: boolean;
    currentImageId: string;
    open: () => void;
    close: () => void;
    setCurrentImageId: (newImgId: string) => void;
};

export const useEnlargedImageStore = create<EnlargedImageStoreState>(set => ({
    isOpen: false,
    currentImageId: "",
    setCurrentImageId: newImageId => set(state => ({ ...state, currentImageId: newImageId })),
    open: () => set(state => ({ ...state, isOpen: true })),
    close: () => set(state => ({ ...state, isOpen: false, currentImageId: "" }))
}));
