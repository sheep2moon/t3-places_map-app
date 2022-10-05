import React from "react";

type CheckboxProps = {
    checked: boolean;
    handleClick: (v: any) => void;
};

const Checkbox = ({ checked, handleClick }: CheckboxProps) => {
    return (
        <div onClick={handleClick} className="flex items-center justify-center w-8 h-8 border border-light rounded-sm cursor-pointer">
            {checked && <span className="w-4 aspect-square rounded-sm bg-secondary" />}
        </div>
    );
};

export default Checkbox;
