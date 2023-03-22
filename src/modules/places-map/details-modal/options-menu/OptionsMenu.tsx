import { Menu } from "@headlessui/react";
import React, { useState } from "react";
import { BsFillShareFill } from "react-icons/bs";
import { GoReport } from "react-icons/go";
import Button from "../../../common/Button";
import InputText from "../../../common/InputText";
import Modal from "../../../common/Modal";

type OptionsMenuProps = {
  placeId: string;
};

const OptionsMenu: React.FC<OptionsMenuProps> = ({ placeId }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleCopyShareLink = () => {
    const textToCopy = `localhost:3000/placesMap/${placeId}`;
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <div>
      <Modal
        close={() => setIsShareModalOpen(false)}
        isModalOpen={isShareModalOpen}
      >
        <div className="-mt-8 flex flex-col gap-2">
          <span className="mb-8 flex items-center gap-2 text-left text-xl">
            <BsFillShareFill />
            Udostępnij
          </span>
          <div className="flex ">
            <input
              className="w-full bg-dark py-1 px-2 text-light"
              type="text"
              readOnly
              value={`localhost:3000/placesMap/${placeId}`}
            />
            <Button className="whitespace-nowrap">Kopiuj link</Button>
          </div>
        </div>
      </Modal>
      <Menu as="div" className="relative flex flex-col items-end">
        <Menu.Button className="h-8 w-16 rounded-sm bg-primary text-light">
          ...
        </Menu.Button>
        <Menu.Items className="items-left mr-2 mt-1 flex flex-col bg-dark p-1">
          <Menu.Item>
            <MenuItemButton onClick={() => setIsShareModalOpen(true)}>
              <BsFillShareFill />
              Udostępnij
            </MenuItemButton>
          </Menu.Item>
          <Menu.Item>
            <MenuItemButton>
              <GoReport />
              Zgłoś
            </MenuItemButton>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default OptionsMenu;

const MenuItemButton = ({
  children,
  ...rest
}: {
  children: React.ReactNode | string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...rest}
      className="flex items-center gap-2 px-2 py-1 text-left text-light"
    >
      {children}
    </button>
  );
};
