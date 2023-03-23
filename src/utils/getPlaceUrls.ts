export const getPlaceRouterHref = (placeId: string) => {
    return `/places-map?placeId=${placeId}`;
};

export const getPlaceUrl = (placeId: string) => {
    return `localhost:3000/places-map?placeId=${placeId}`;
};
