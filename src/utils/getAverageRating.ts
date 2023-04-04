import { Review } from "@prisma/client";

export const getAverageRating = (reviews: Review[]) => {
    if (reviews.length == 0) return 0;
    const rateSum = reviews.reduce((acc, review) => {
        return acc + review.rate;
    }, 0);
    return (rateSum / reviews.length).toFixed(1);
};
