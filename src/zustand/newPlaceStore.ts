import { Place } from "@prisma/client";
import create from "zustand";

type NewPlaceState = Omit<Place, "id" | "addedById" | "createdAt" | "prices"> & {
    // showError: boolean;
    setPosition: (position: Position) => void;
    setDisplayName: (name: string) => void;
    setDescription: (description: string) => void;
    setPlaceTypeId: (id: string) => void;
    setIsPaid: (value: boolean) => void;
    setPrices: (prices: { title: string; value: string }[]) => void;
    prices: { title: string; value: string }[];
    // setShowError: (b: boolean) => void;
};

export const useNewPlaceStore = create<NewPlaceState>(set => ({
    lat: 0,
    lng: 0,
    displayName: "",
    description: "",
    placeTypeId: "",
    isPaid: false,
    prices: [],
    setPosition: ({ lat, lng }) => set(state => ({ ...state, lat, lng })),
    setDisplayName: displayName => {
        set(state => ({ ...state, displayName }));
    },
    setDescription: description => set(state => ({ ...state, description })),
    setPlaceTypeId: placeTypeId => set(state => ({ ...state, placeTypeId })),
    setIsPaid: value => set(state => ({ ...state, isPaid: value })),
    setPrices: prices => set(state => ({ ...state, prices }))
}));
