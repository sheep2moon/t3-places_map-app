import React from "react";
import HorizontalLine from "../../common/HorizontalLine";
import { IoMdPricetags } from "react-icons/io";

const PlacePricing = ({ prices }: { prices: { title: string; value: string }[] }) => {
    return (
        <div className="flex flex-col">
            <HorizontalLine className="mb-2">
                <div className="flex items-center gap-1">
                    <IoMdPricetags />
                    Ceny
                </div>
            </HorizontalLine>
            {prices.map((price, index) => (
                <div className="grid grid-cols-2 gap-4" key={`${price.title}${index}`}>
                    <span className="text-end">{price.title}</span>
                    <span className="text-start">{price.value}</span>
                </div>
            ))}
        </div>
    );
};

export default PlacePricing;
