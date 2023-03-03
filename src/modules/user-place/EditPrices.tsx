import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import Button from "../common/Button";
import LabelBar, { LabelBarProps } from "./LabelBar";

type EditPricesProps = {
    prices: { title: string; value: string }[];
    isPaid: boolean;
    placeId: string;
};

const EditPrices = ({ prices, isPaid, placeId }: EditPricesProps) => {
    const [currentPrices, setCurrentPrices] = useState(prices);
    const [currentIsPaid, setCurrentIsPaid] = useState(isPaid);
    const [pricesCount, setPricesCount] = useState(prices.length);
    const [isEditing, setIsEditing] = useState(false);
    const { mutateAsync: updatePlacePrices } = trpc.useMutation("protectedPlace.updatePlacePrices");

    console.log(prices);

    const handleEdit = () => {
        setIsEditing(true);
    };
    const handleCancel = () => {
        setIsEditing(false);
        setCurrentPrices(prices);
        setPricesCount(prices.length);
    };
    const handleConfirm = async () => {
        await updatePlacePrices({ placeId, prices: JSON.stringify(currentPrices), isPaid: currentIsPaid });
        setIsEditing(false);
    };

    const LabelBarProps: LabelBarProps = {
        label: isPaid ? "Cennik miejsca" : "Miejsce bezpłatne",
        handleCancel,
        handleConfirm,
        handleEdit,
        isEditing
    };

    const handleToggleIsPaid = () => {
        setCurrentIsPaid(prev => {
            return !prev;
        });
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
                {isEditing && (
                    <div className="flex items-center gap-4 py-4 px-2">
                        Miejsce płatne?
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input onChange={handleToggleIsPaid} type="checkbox" checked={currentIsPaid ? true : false} className="peer sr-only" />
                            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                            <span className="sr-only ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">miejsce płatne</span>
                        </label>
                    </div>
                )}
                {currentIsPaid && (
                    <>
                        {pricesCount > 0 && (
                            <div className="flex">
                                <p className="w-full p-1 text-center">nazwa</p>
                                <p className="w-full p-1 text-center">wartość</p>
                            </div>
                        )}
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
                        </div>
                        {isEditing && (
                            <div className="flex flex-col bg-dark px-2">
                                <Button className="my-2" variant="outline" onClick={handleAddNewPrice}>
                                    Dodaj wiersz +
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default EditPrices;
