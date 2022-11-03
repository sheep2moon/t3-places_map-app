import { Place } from "@prisma/client";
import create from "zustand";

type NewPlaceState = Omit<Place, "id"> & {
    setPosition: (p: Position) => void;
    setName: (n: string) => void;
    setDescription: (d: string) => void;
    setPlaceTypeId: (id: string) => void;
};

export const useNewPlaceStore = create<NewPlaceState>(set => ({
    lat: 0,
    lng: 0,
    displayName: "das",
    description: "",
    placeTypeId: "",
    setPosition: ({ lat, lng }) => set(state => ({ ...state, lat, lng })),
    setName: displayName => {
        set(state => ({ ...state, displayName }));
    },
    setDescription: description => set(state => ({ ...state, description })),
    setPlaceTypeId: placeTypeId => set(state => ({ ...state, placeTypeId }))
}));
