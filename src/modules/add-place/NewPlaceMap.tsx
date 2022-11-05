import React from "react";
import { useNewPlaceStore } from "../../zustand/newPlaceStore";
import PositionMap from "../map/PositionMap";

const NewPlaceMap = () => {
    const { lat, lng, setPosition } = useNewPlaceStore(state => state);
    return <PositionMap position={{ lat, lng }} setPosition={setPosition} />;
};

export default NewPlaceMap;
