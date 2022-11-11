import React, { useEffect, useState } from "react";
import Button from "../../../common/Button";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    if (!mounted) return null;
    return (
        <div className="flex items-center">
            <label htmlFor="checked-toggle" className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" value="" id="checked-toggle" className="peer sr-only" checked={theme === "dark"} onChange={handleToggle} />
                <div className="peer h-6 w-11 rounded-full border border-primary/40 bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-violet-900 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
            </label>
        </div>
    );
};

export default ThemeSwitch;
