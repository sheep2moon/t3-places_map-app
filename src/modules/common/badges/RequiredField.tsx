import React from "react";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import Tooltip from "../tooltip/Tooltip";

const RequiredField = ({ direction }: { direction?: Direction }) => {
    return (
        <Tooltip content="Pole wymagane" direction={direction}>
            <BsFillExclamationCircleFill />
        </Tooltip>
    );
};

export default RequiredField;
