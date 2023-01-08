import React, { useState } from "react";
import { IoStarOutline, IoStar } from "react-icons/io5";

type AddRatingProps = {
    rate: number;
    setRate: (r: number) => void;
    disabled: boolean;
};

const ReviewRating = ({ rate, setRate, disabled }: AddRatingProps) => {
    const [hoveredStars, setHoveredStars] = useState(0);

    const handleMouseOver = (rate: number) => {
        setHoveredStars(rate);
    };

    const handleMouseOut = () => {
        setHoveredStars(0);
    };

    const handleClick = (r: number) => {
        console.log(r);

        setRate(r);
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm">Twoja ocena</span>
            <div className="my-2 flex  text-amber-400">
                {[...Array(5)].map((_, index) => (
                    <button
                        style={{ pointerEvents: disabled ? "none" : "all" }}
                        disabled={disabled}
                        className=" px-1 text-xl "
                        key={`rating-star-${index}`}
                        onClick={() => handleClick(index + 1)}
                        onMouseOver={() => handleMouseOver(index + 1)}
                        onMouseOut={handleMouseOut}
                    >
                        {(hoveredStars || rate) <= index ? <IoStarOutline /> : <IoStar />}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ReviewRating;
