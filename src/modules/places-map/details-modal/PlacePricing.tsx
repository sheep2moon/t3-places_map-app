import React from "react";

const PlacePricing = ({ prices }: { prices: { title: string; value: string }[] }) => {
    return (
        <div className="flex flex-col">
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
