import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment, useEffect } from "react";
import { HiSelector } from "react-icons/hi";
import { BsCheck } from "react-icons/bs";
import { Category } from "@prisma/client";

type SelectCategoryProps = {
    selected: Category | Record<string, never>;
    items: Category[];
    select: (c: Category) => void;
};

const SelectCategory = ({ selected, items, select }: SelectCategoryProps) => {
    console.log(items);
    useEffect(() => {
        if (items[0]) select(items[0]);
    }, []);

    return (
        <>
            <Listbox value={selected} onChange={select}>
                <div className="relative mt-1">
                    {selected && (
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-50 py-3 pl-3 pr-10 text-left text-primary shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate">{selected.name}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <HiSelector className="h-5 w-5 text-primary" aria-hidden="true" />
                            </span>
                        </Listbox.Button>
                    )}
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {items.map((item, itemIdx) => (
                                <Listbox.Option key={itemIdx} className={({ active }) => `relative cursor-default select-none py-3 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"}`} value={item}>
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{item.name}</span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                    <BsCheck className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </>
    );
};

export default SelectCategory;
