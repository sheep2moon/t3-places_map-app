import React, { useState } from "react";
import LabelBar, { LabelBarProps } from "./LabelBar";

const EditPrices = ({ prices }: { prices: { title: string; value: string }[] }) => {
    const [currentPrices, setCurrentPrices] = useState(prices);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };
    const handleCancel = () => {
        setIsEditing(false);
    };
    const handleConfirm = () => {
        setIsEditing(false);
    };

    const LabelBarProps: LabelBarProps = {
        label: "Cennik miejsca",
        handleCancel,
        handleConfirm,
        handleEdit,
        isEditing
    };

    return (
        <div className="flex flex-col">
            <LabelBar {...LabelBarProps} />
            <div>
                <div className="flex">
                    <p className="w-full p-1 text-center">dotyczy</p>
                    <p className="w-full p-1 text-center">wartość</p>
                </div>
                {currentPrices.map((price, index) => (
                    <div className="flex gap-1" key={`${price.title}${index}`}>
                        <input type="text" value={price.title} className="w-full bg-slate-300/20 p-1" />
                        <input className="w-full bg-slate-300/20 p-1" type="text" value={price.value} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EditPrices;
