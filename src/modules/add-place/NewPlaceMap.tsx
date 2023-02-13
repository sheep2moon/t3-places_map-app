import React from "react";
import { useNewPlaceStore } from "../../zustand/newPlaceStore";
import Label from "../common/Label";
import PositionMap from "../map/PositionMap";

const NewPlaceMap = () => {
    const { lat, lng, setPosition, errors, setError } = useNewPlaceStore(state => state);

    const handleSetPosition = (p: Position) => {
        setPosition(p);
        if (errors.get("position")) {
            setError("position", false);
        }
    };

    return (
        <div>
            <Label isError={errors.get("position")}>Pozycja</Label>
            <PositionMap position={{ lat, lng }} setPosition={handleSetPosition} />
        </div>
    );
};

export default NewPlaceMap;
