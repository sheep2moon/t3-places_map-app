import React, { useState } from "react";
import { useNewPlaceStore } from "../../zustand/newPlaceStore";
import Label from "../common/Label";
import InputText from "../common/InputText";
import Button from "../common/Button";
import { ImPriceTags } from "react-icons/im";
import { IoIosAddCircleOutline } from "react-icons/io";

const PricesForm = () => {
    const { isPaid, setIsPaid, setPrices, prices } = useNewPlaceStore(store => store);
    const [priceCount, setPriceCount] = useState(0);

    const handleToggleIsPaid = () => {
        setIsPaid(!isPaid);
    };

    const handlePriceTitleChange = (index: number, title: string) => {
        const newPrices = prices.map((price, i) => {
            if (index == i) {
                return { ...price, title };
            }
            return price;
        });
        setPrices(newPrices);
    };

    const handlePriceValueChange = (index: number, value: string) => {
        const newPrices = prices.map((price, i) => {
            if (index == i) {
                return { ...price, value };
            }
            return price;
        });
        setPrices(newPrices);
    };

    const handleDeletePrice = (index: number) => {
        const newPrices = prices.filter((_, i) => i !== index);
        setPrices(newPrices);
        setPriceCount(prev => prev - 1);
    };

    const handleAddNewPrice = () => {
        setPrices([...prices, { title: "", value: "" }]);
        setPriceCount(prev => prev + 1);
    };

    return (
        <div className="mt-2 flex w-full flex-col">
            <Label>
                <div className="flex items-center justify-between">
                    Miejsce płatne?
                    <label className="relative inline-flex cursor-pointer items-center">
                        <input onChange={handleToggleIsPaid} type="checkbox" checked={isPaid ? true : false} className="peer sr-only" />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                        <span className="sr-only ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">miejsce płatne</span>
                    </label>
                </div>
            </Label>
            {isPaid && (
                <div className="mt-2 flex w-full flex-col gap-1">
                    {/* <p>Wprowadź cennik</p> */}
                    {prices.length > 0 && (
                        <div className="grid grid-cols-2 gap-1 p-1 pr-11 dark:bg-stone-900">
                            <span className="ml-2">Nazwa usługi</span>
                            <span className="ml-2">Cena</span>
                        </div>
                    )}
                    {Array(priceCount)
                        .fill(0)
                        .map((_, index) => (
                            <div className="mb-2 flex w-full items-center gap-1" key={`${index}`}>
                                <InputText value={prices[index]?.title} placeholder="1 godzina" handleChange={e => handlePriceTitleChange(index, e.target.value)} />
                                <InputText value={prices[index]?.value} placeholder="20zł/os" handleChange={e => handlePriceValueChange(index, e.target.value)} />
                                <button onClick={() => handleDeletePrice(index)} className="h-10 w-10 shrink-0 rounded-md bg-stone-900 hover:bg-black">
                                    X
                                </button>
                            </div>
                        ))}
                    <Button onClick={handleAddNewPrice} variant="secondary">
                        {prices.length > 0 ? (
                            <span className="flex items-center gap-2 text-xl">
                                <IoIosAddCircleOutline />
                                Dodaj opcje
                            </span>
                        ) : (
                            <span className="flex items-center gap-2 text-xl">
                                <ImPriceTags />
                                Stwórz cennik
                            </span>
                        )}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default PricesForm;
