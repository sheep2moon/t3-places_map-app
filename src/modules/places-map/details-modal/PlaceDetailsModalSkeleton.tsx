import React from "react";
import CardSkeleton from "../../common/skeletons/CardSkeleton";
import ImageSkeleton from "../../common/skeletons/ImageSkeleton";
import LineSkeleton from "../../common/skeletons/LineSkeleton";
import TextSkeleton from "../../common/skeletons/TextSkeleton";

const PlaceDetailsModalSkeleton = () => {
    return (
        <div className="w-full" role="status">
            <div className="h-48">
                <ImageSkeleton />
            </div>
            <div className="flex flex-col gap-4 px-4">
                <CardSkeleton />
                <LineSkeleton />
                <TextSkeleton />
                <LineSkeleton />
                <div className="grid h-36 grid-cols-3 gap-2 py-2">
                    <ImageSkeleton />
                    <ImageSkeleton />
                    <ImageSkeleton />
                </div>
                <LineSkeleton />
                <TextSkeleton />
            </div>
            <span className="sr-only">Wczytywanie...</span>
        </div>
    );
};

export default PlaceDetailsModalSkeleton;
