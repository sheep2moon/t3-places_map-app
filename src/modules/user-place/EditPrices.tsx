import React from "react";

const EditPrices = ({ prices }: { prices: { title: string; value: string }[] }) => {
    console.log(prices);

    return (
        <div>
            {prices.map((price, index) => (
                <div key={`${price.title}${index}`}>
                    <span>{price.title}</span>
                    <span>{price.value}</span>
                </div>
            ))}
        </div>
    );
};

export default EditPrices;
