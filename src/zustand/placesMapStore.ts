import create from "zustand";

type PlacesMapStoreState = {
    selectedTypeId: string;
    currentPlaceId: string;
    isPlaceModalOpen: boolean;
    setIsPlaceModalOpen: (v: boolean) => void;
    setCurrentPlaceId: (placeId: string) => void;
    setSelectedTypeId: (typeId: string) => void;
};

export const usePlacesMapStore = create<PlacesMapStoreState>(set => ({
    selectedTypeId: "",
    currentPlaceId: "",
    isPlaceModalOpen: false,
    setIsPlaceModalOpen: v => set(state => ({ ...state, isPlaceModalOpen: v })),
    setCurrentPlaceId: placeId => set(state => ({ ...state, currentPlaceId: placeId })),
    setSelectedTypeId: typeId => set(state => ({ ...state, selectedTypeId: typeId }))
}));
