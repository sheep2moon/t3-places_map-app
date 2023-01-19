import React from "react";

const BlockSkeleton = ({ children }: { children?: React.ReactNode }) => {
    return <div className="h-full w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-700">{children !== undefined && children}</div>;
};

export default BlockSkeleton;
