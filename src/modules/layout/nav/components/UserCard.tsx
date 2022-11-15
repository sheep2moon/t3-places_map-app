import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { Fragment } from "react";
import Button from "../../../common/Button";
import UserAvatar from "../../../common/UserAvatar";
import { AiFillProfile } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";

type UserCardProps = {
    name: string | null | undefined;
    image: string | null | undefined;
};

const UserCard = ({ name, image }: UserCardProps) => {
    return (
        <div className="w flex items-center gap-2 rounded-md p-1">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center  text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <UserAvatar size={10} image={image ?? ""} />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md border bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border-black dark:bg-primary">
                        <div className="px-1 py-1 ">
                            <div className="text- flex justify-center bg-black/20 text-xs">
                                <span>{name}</span>
                            </div>
                            <Menu.Item>
                                <Link href="/profile">
                                    <a className="flex items-center gap-2 p-1 hover:bg-light/10">
                                        <AiFillProfile className="text-secondary" />
                                        <span>Profil</span>
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link href="/user/library">
                                    <a className="flex items-center gap-2 p-1 hover:bg-light/10">
                                        <MdFavorite className="text-secondary" />
                                        <span>Biblioteka</span>
                                    </a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <div className="flex justify-center">
                                    <Button variant="alternative" className="w-full">
                                        Wyloguj
                                    </Button>
                                </div>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

export default UserCard;
