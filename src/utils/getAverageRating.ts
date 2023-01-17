import { Review } from "@prisma/client";

export const getAverageRating = (reviews: Review[]) => {
    const rateSum = reviews.reduce((acc, review) => {
        return acc + review.rate;
    }, 0);
    return (rateSum / reviews.length).toFixed(1);
};
