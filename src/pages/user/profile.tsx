import { Tab } from "@headlessui/react";
import clsx from "clsx";
import React from "react";
import InternalLink from "../../modules/common/links/InternalLink";

const tabList = [
  {
    id: 1,
    title: "Biblioteka",
  },
  {
    id: 2,
    title: "Moje miejsca",
  },
];

const UserProfile = () => {
  return (
    <div className="flex w-full max-w-screen-xl flex-col">
      <section className="flex w-full flex-col items-center px-4 py-12 dark:bg-dark sm:py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold leading-9 text-white sm:text-4xl sm:leading-10">
            Used by leading architects, home builders renovators.
          </h2>
          <p className="mt-3 text-base leading-7 text-white sm:mt-4">
            Feel confident in choosing the best energy assessor for your energy
            rating.
          </p>
        </div>
        <div className="mt-10 text-center sm:mx-auto sm:grid sm:max-w-3xl sm:grid-cols-3 sm:gap-8">
          <div>
            <p className="text-5xl font-extrabold leading-none text-white">
              119
            </p>
            <p className="mt-2 text-base font-medium leading-6 text-white">
              Energy raters
            </p>
          </div>
          <div className="mt-10 sm:mt-0">
            <p className="text-5xl font-extrabold leading-none text-white">6</p>
            <p className="mt-2 text-base font-medium leading-6 text-white">
              Quotes on average
            </p>
          </div>
          <div className="mt-10 sm:mt-0">
            <p className="text-5xl font-extrabold leading-none text-white">
              24 hours
            </p>
            <p className="mt-2 text-base font-medium leading-6 text-white">
              Average turnaround
            </p>
          </div>
        </div>
        <InternalLink className="mt-8" href="/add-place">
          Dodaj miejsce
        </InternalLink>
      </section>
      <Tab.Group>
        <Tab.List className="flex">
          {tabList.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                clsx(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  {
                    "bg-white shadow": selected,
                    "text-blue-100 hover:bg-white/[0.12] hover:text-white":
                      !selected,
                  }
                )
              }
            >
              {tab.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>Content 1</Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
          <Tab.Panel>Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default UserProfile;
