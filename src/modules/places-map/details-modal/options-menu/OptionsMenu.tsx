import { Menu } from "@headlessui/react";
import React, { useState } from "react";
import { BsFillShareFill } from "react-icons/bs";
import { GoReport } from "react-icons/go";
import { IoMdCopy } from "react-icons/io";
import { EmailIcon, EmailShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import { toast } from "react-toastify";
import Button from "../../../common/Button";
import Modal from "../../../common/Modal";
import { getPlaceUrl } from "../../../../utils/getPlaceUrls";
import ReportModal from "../../../report-modal";
import { BiDotsHorizontalRounded } from "react-icons/bi";

type OptionsMenuProps = {
    placeId: string;
};

const OptionsMenu: React.FC<OptionsMenuProps> = ({ placeId }) => {
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const shareUrl = getPlaceUrl(placeId);
    const handleCopyShareLink = async () => {
        try {
            navigator.clipboard.writeText(shareUrl);
            toast("Skopiowano", {
                autoClose: 1000,
                type: "success",
                theme: "colored"
            });
        } catch (error) {
            toast("Wystąpił bład", { autoClose: 3000, type: "error" });
        }
    };

    return (
        <div>
            <Modal close={() => setIsShareModalOpen(false)} isModalOpen={isShareModalOpen}>
                <div className="-mt-8 flex flex-col gap-2">
                    <span className="mb-8 flex items-center gap-2 text-left text-xl">
                        <BsFillShareFill />
                        Udostępnij
                    </span>
                    <div className="mb-4">
                        <WhatsappShareButton title="Interesujące miejsce" separator=" " url={shareUrl}>
                            <WhatsappIcon />
                        </WhatsappShareButton>
                        <TelegramShareButton url={shareUrl}>
                            <TelegramIcon />
                        </TelegramShareButton>
                        <EmailShareButton separator=" " subject="Miejsce które muszę odwiedzić" body="Zerknij na to miejsce które znalazłem na Plecaku! " url={shareUrl}>
                            <EmailIcon />
                        </EmailShareButton>
                        <TwitterShareButton title="Interesujące miejsce" url={shareUrl}>
                            <TwitterIcon />
                        </TwitterShareButton>
                    </div>
                    <div className="mx-auto">
                        <Button onClick={handleCopyShareLink} className="flex items-center gap-2 whitespace-nowrap">
                            <IoMdCopy />
                            Kopiuj link
                        </Button>
                    </div>
                </div>
            </Modal>
            <ReportModal close={() => setIsReportModalOpen(false)} isModalOpen={isReportModalOpen} />
            <Menu as="div" className="relative flex flex-col items-end">
                <Menu.Button className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-light shadow-sm shadow-white/60">
                    <BiDotsHorizontalRounded className="text-4xl" />
                </Menu.Button>
                <Menu.Items className="items-left mr-2 mt-1 flex flex-col bg-dark p-1">
                    <Menu.Item>
                        <MenuItemButton onClick={() => setIsShareModalOpen(true)}>
                            <BsFillShareFill />
                            Udostępnij
                        </MenuItemButton>
                    </Menu.Item>
                    <Menu.Item>
                        <MenuItemButton onClick={() => setIsReportModalOpen(true)}>
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
        <button {...rest} className="flex items-center gap-2 px-2 py-1 text-left text-light hover:bg-slate-100/5">
            {children}
        </button>
    );
};
