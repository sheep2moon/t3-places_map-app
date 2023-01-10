import React, { useState } from "react";
import { useNewPlaceStore } from "../../zustand/newPlaceStore";
import Label from "../common/Label";
import InputText from "../common/InputText";
import Button from "../common/Button";

type RawPrice = {
    title: string;
    value: string;
};

const PricesForm = () => {
    const { isPaid, setIsPaid, setPrices, prices } = useNewPlaceStore(store => store);
    const [rawPrices, setRawPrices] = useState<RawPrice[]>([{ title: "", value: "" }]);

    const handlePriceTitleChange = (index: number, title: string) => {
        const prev = [...rawPrices][index];
        if (prev != undefined) {
            prev.title = title;
        }
    };

    const handlePriceValueChange = (index: number, value: string) => {
        const prev = [...rawPrices][index];
        if (prev != undefined) {
            prev.value = value;
        }
    };

    const handleAddNewPrice = () => {
        setRawPrices(prev => [...prev, { title: "", value: "" }]);
    };

    return (
        <div className="mt-2 flex w-full flex-col">
            <Label>
                <div className="flex items-center justify-between">
                    Miejsce płatne?
                    <label className="relative inline-flex cursor-pointer items-center">
                        <input onChange={() => setIsPaid(!isPaid)} type="checkbox" checked={isPaid ? true : false} className="peer sr-only" />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                        <span className="sr-only ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">miejsce płatne</span>
                    </label>
                </div>
            </Label>
            {isPaid && (
                <div className="mt-2 flex w-full flex-col">
                    {/* <p>Wprowadź cennik</p> */}
                    <div className="grid grid-cols-2 gap-1 p-1 dark:bg-stone-900">
                        <span className="ml-2">Nazwa usługi</span>
                        <span className="ml-2">Cena</span>
                    </div>
                    {rawPrices.map((rawPrice, index) => (
                        <div className="mb-2 flex w-full items-center gap-1 space-y-1" key={`${rawPrice.title}${index}`}>
                            <InputText placeholder="1 godzina" handleChange={e => handlePriceTitleChange(index, e.target.value)} />
                            <InputText placeholder="20zł/os" handleChange={e => handlePriceValueChange(index, e.target.value)} />
                        </div>
                    ))}
                    <Button onClick={handleAddNewPrice} variant="primary">
                        Dodaj opcje
                    </Button>
                </div>
            )}
        </div>
    );
};

export default PricesForm;
