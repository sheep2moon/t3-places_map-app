import create from "zustand";

type PlacesMapStoreState = {
    selectedTypeId: string;
    currentPlaceId: string;
    showPlaceModal: boolean;
    setShowPlaceModal: (v: boolean) => void;
    setCurrentPlaceId: (placeId: string) => void;

    setSelectedTypeId: (typeId: string) => void;
};

export const usePlacesMapStore = create<PlacesMapStoreState>(set => ({
    selectedTypeId: "",
    currentPlaceId: "",
    showPlaceModal: false,
    setShowPlaceModal: v => set(state => ({ ...state, showPlaceModal: v })),
    setCurrentPlaceId: placeId => set(state => ({ ...state, currentPlaceId: placeId })),
    setSelectedTypeId: typeId => set(state => ({ ...state, selectedTypeId: typeId }))
}));
