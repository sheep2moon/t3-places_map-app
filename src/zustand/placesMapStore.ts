import create from "zustand";

type PlacesMapStoreState = {
    selectedTypeId: string;
    setSelectedTypeId: (typeId: string) => void;
};

export const usePlacesMapStore = create<PlacesMapStoreState>(set => ({
    selectedTypeId: "",
    setSelectedTypeId: typeId => set(state => ({ ...state, selectedTypeId: typeId }))
}));
