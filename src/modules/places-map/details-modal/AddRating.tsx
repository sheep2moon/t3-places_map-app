import React, { useState } from "react";
import { IoStarOutline, IoStar } from "react-icons/io5";

type AddRatingProps = {
    rate: number;
    setRate: (r: number) => void;
};

const AddRating = ({ rate, setRate }: AddRatingProps) => {
    const [hoveredStars, setHoveredStars] = useState(0);
    return (
        <div className="flex items-center gap-2">
            <span>Ocena</span>
            <div className="my-2 flex  text-amber-400">
                {[...Array(10)].map((_, index) => (
                    <button className=" px-0.5 " key={`rating-star-${index}`} onClick={() => setRate(index + 1)} onMouseOver={() => setHoveredStars(index + 1)} onMouseOut={() => setHoveredStars(0)}>
                        {(hoveredStars || rate) <= index ? <IoStarOutline /> : <IoStar />}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AddRating;
