type Position = {
    lat: number;
    lng: number;
};

type PlacePositionState = {
    placePosition?: Position;
    setPlacePosition: (p: Position) => void;
};

// type Place = {
//     placeId: number;
//     displayName: string;
//     position: Position;
// };
