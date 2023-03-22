import { Combobox, Transition } from "@headlessui/react";
import React, { ChangeEvent, useRef, useState } from "react";
import { HiOutlineSelector } from "react-icons/hi";

type SearchPlaceInputProps = {
  setPosition: (p: Position) => void;
};

type SuggestionPlace = {
  placeId: number;
  displayName: string;
  position: Position;
};

const SearchPlaceInput = ({ setPosition }: SearchPlaceInputProps) => {
  const [suggestions, setSuggestions] = useState<Array<SuggestionPlace>>([]);
  const querySearchRef: { current: NodeJS.Timeout | null } = useRef(null);

  const searchPlaceByQuery = async (query: string) => {
    const queryUrl = `https://nominatim.openstreetmap.org/search?q=${query}&countrycodes=pl&format=json&addressdetails=1`;
    const res = await fetch(queryUrl);
    const result = await res.json();
    if (result && result.length >= 1) {
      const newSuggestions: SuggestionPlace[] = result.map((place: any) => ({
        placeId: place.place_id,
        displayName: place.display_name,
        position: { lat: place.lat, lng: place.lon },
      }));
      setSuggestions(newSuggestions);
    }
  };

  const handleSearchPlace = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(querySearchRef.current as NodeJS.Timeout);
    if (e.target.value.length > 3) {
      const searchValue = e.target.value.includes(" ")
        ? e.target.value.replaceAll(" ", "+")
        : e.target.value;
      querySearchRef.current = setTimeout(() => {
        searchPlaceByQuery(searchValue);
      }, 300);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="z-[9999] w-screen max-w-lg">
      <Combobox
        nullable
        onChange={(p: SuggestionPlace) =>
          setPosition({ lat: p.position.lat, lng: p.position.lng })
        }
      >
        <div className="relative">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              displayValue={(suggestion: SuggestionPlace) =>
                suggestion ? suggestion.displayName : ""
              }
              onChange={handleSearchPlace}
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
            />

            <Combobox.Button className=" absolute inset-y-0 right-0 px-2 text-lg text-slate-800">
              <HiOutlineSelector />
            </Combobox.Button>
          </div>

          {suggestions.length > 0 && (
            <div className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white  text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Combobox.Options className="pb-1">
                  <Combobox.Option
                    className="cursor-pointer bg-slate-300 text-center text-zinc-900"
                    value=""
                  >
                    Wyczyść
                  </Combobox.Option>
                  {suggestions.map((suggestion) => (
                    <Combobox.Option
                      key={suggestion.placeId}
                      value={suggestion}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-2 pr-4 ${
                          active ? "bg-teal-600 text-white" : "text-gray-900"
                        }`
                      }
                    >
                      {suggestion.displayName}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Transition>
            </div>
          )}
        </div>
      </Combobox>
    </div>
  );
};

export default SearchPlaceInput;
