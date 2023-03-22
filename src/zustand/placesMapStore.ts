import create from "zustand";

type PlacesMapStoreState = {
  selectedTypeId: string;
  currentPlaceId: string;
  isPlaceModalOpen: boolean;
  flyTo: Position | null;
  setIsPlaceModalOpen: (v: boolean) => void;
  setFlyTo: (p: Position | null) => void;
  setCurrentPlaceId: (placeId: string) => void;
  setSelectedTypeId: (typeId: string) => void;
};

export const usePlacesMapStore = create<PlacesMapStoreState>((set) => ({
  selectedTypeId: "",
  currentPlaceId: "",
  isPlaceModalOpen: false,
  flyTo: null,
  setIsPlaceModalOpen: (v) =>
    set((state) => ({ ...state, isPlaceModalOpen: v })),
  setFlyTo: (p) => set((state) => ({ ...state, flyTo: p })),
  setCurrentPlaceId: (placeId) =>
    set((state) => ({ ...state, currentPlaceId: placeId })),
  setSelectedTypeId: (typeId) =>
    set((state) => ({ ...state, selectedTypeId: typeId })),
}));
