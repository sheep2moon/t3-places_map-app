import React, { ChangeEvent, useState } from "react";
import { trpc } from "../../utils/trpc";
import Button from "../common/Button";
import LabelBar, { LabelBarProps } from "./LabelBar";

type EditPricesProps = {
    prices: { title: string; value: string }[];
    placeId: string;
};

const EditPrices = ({ prices, placeId }: EditPricesProps) => {
    const [currentPrices, setCurrentPrices] = useState(prices);
    const [pricesCount, setPricesCount] = useState(prices.length);
    const [isEditing, setIsEditing] = useState(false);
    const { mutateAsync: updatePlacePrices } = trpc.useMutation("protectedPlace.updatePlacePrices");

    const handleEdit = () => {
        setIsEditing(true);
    };
    const handleCancel = () => {
        setIsEditing(false);
        setCurrentPrices(prices);
        setPricesCount(prices.length);
    };
    const handleConfirm = async () => {
        await updatePlacePrices({ placeId, prices: JSON.stringify(currentPrices) });
        setIsEditing(false);
    };

    const LabelBarProps: LabelBarProps = {
        label: "Cennik miejsca",
        handleCancel,
        handleConfirm,
        handleEdit,
        isEditing
    };

    const handlePriceTitleChange = (index: number, title: string) => {
        const newPrices = currentPrices.map((price, i) => {
            if (index == i) {
                return { ...price, title };
            }
            return price;
        });
        setCurrentPrices(newPrices);
    };
    const handlePriceValueChange = (index: number, value: string) => {
        const newPrices = currentPrices.map((price, i) => {
            if (index == i) {
                return { ...price, value };
            }
            return price;
        });
        setCurrentPrices(newPrices);
    };

    const handleDeletePrice = (index: number) => {
        const newPrices = currentPrices.filter((_, i) => i !== index);
        setCurrentPrices(newPrices);
        setPricesCount(prev => prev - 1);
    };

    const handleAddNewPrice = () => {
        setCurrentPrices([...currentPrices, { title: "", value: "" }]);
        setPricesCount(prev => prev + 1);
    };

    return (
        <div className="flex flex-col">
            <LabelBar {...LabelBarProps} />
            <div>
                <div className="flex">
                    <p className="w-full p-1 text-center">nazwa</p>
                    <p className="w-full p-1 text-center">wartość</p>
                </div>
                <div className="flex flex-col gap-1">
                    {Array(pricesCount)
                        .fill(0)
                        .map((_, index) => (
                            <div className="flex gap-1" key={`${prices[index]?.title}${index}`}>
                                <input disabled={!isEditing} onChange={e => handlePriceTitleChange(index, e.target.value)} type="text" value={currentPrices[index]?.title} className="w-full bg-slate-300/20 p-1" />
                                <input disabled={!isEditing} onChange={e => handlePriceValueChange(index, e.target.value)} className="w-full bg-slate-300/20 p-1" type="text" value={currentPrices[index]?.value} />
                                {isEditing && (
                                    <button onClick={() => handleDeletePrice(index)} className="h-10 w-10 shrink-0 rounded-md bg-white shadow-sm shadow-primary/40 hover:bg-black dark:bg-stone-900">
                                        X
                                    </button>
                                )}
                            </div>
                        ))}
                    {isEditing && (
                        <Button variant="outline" onClick={handleAddNewPrice}>
                            Dodaj wiersz
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditPrices;
