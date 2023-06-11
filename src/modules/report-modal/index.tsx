import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { trpc } from "../../utils/trpc";
import Button from "../common/Button";
import InputText from "../common/InputText";
import Modal from "../common/Modal";
import TextArea from "../common/TextArea";

type ReportModalProps = {
    isModalOpen: boolean;
    close: () => void;
};

const ReportModal = ({ isModalOpen, close }: ReportModalProps) => {
    const [title, setTitle] = useState("");
    const [reportContent, setReportContent] = useState("");
    const session = useSession();

    const handleSuccess = () => {
        toast("Zgłoszenie zostało wysłane.", {
            autoClose: 3000,
            type: "success",
            theme: "colored"
        });
        close();
        setTitle("");
        setReportContent("");
    };

    const { mutateAsync: sendReport, isLoading } = trpc.useMutation("common.sendReport", {
        onMutate: handleSuccess
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await sendReport({
            content: reportContent,
            title,
            userId: session.data?.user?.id
        });
        console.log(res);
    };

    return (
        <Modal isModalOpen={isModalOpen} close={close}>
            <h2 className="mb-4 text-3xl">Zgłoś problem</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-2">
                <InputText name="report-title" value={title} handleChange={e => setTitle(e.target.value)} placeholder="Tytuł" />
                <TextArea name="report-content" placeholder="Treść" value={reportContent} handleChange={e => setReportContent(e.target.value)} />
                <Button type="submit" isLoading={isLoading}>
                    Zgłoś
                </Button>
            </form>
        </Modal>
    );
};

export default ReportModal;
