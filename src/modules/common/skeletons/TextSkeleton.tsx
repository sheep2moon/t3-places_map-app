import React from "react";

const TextSkeleton = () => {
  return (
    <div className="max-w-lg animate-pulse space-y-2.5">
      <div className="flex w-full items-center space-x-2">
        <div className="h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>
      <div className="flex w-full items-center space-x-2">
        <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>
      <div className="flex w-full items-center space-x-2">
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="h-2.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>
    </div>
  );
};

export default TextSkeleton;
