import { Place } from "@prisma/client";
import create from "zustand";

type NewPlaceState = Omit<Place, "id"> & {
    // showError: boolean;
    setPosition: (p: Position) => void;
    setName: (n: string) => void;
    setDescription: (d: string) => void;
    setPlaceTypeId: (id: string) => void;
    // setShowError: (b: boolean) => void;
};

export const useNewPlaceStore = create<NewPlaceState>(set => ({
    // showError: false,
    lat: 0,
    lng: 0,
    displayName: "",
    description: "",
    placeTypeId: "",
    setPosition: ({ lat, lng }) => set(state => ({ ...state, lat, lng })),
    setName: displayName => {
        set(state => ({ ...state, displayName }));
    },
    setDescription: description => set(state => ({ ...state, description })),
    setPlaceTypeId: placeTypeId => set(state => ({ ...state, placeTypeId }))
    // setShowError: b => set(state => ({ ...state, showError: b }))
}));
