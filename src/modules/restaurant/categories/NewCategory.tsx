import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { trpc } from "../../../utils/trpc";
import Button from "../../common/Button";
import ColorSelector from "../../common/color-selector";
import InputFile from "../../common/InputFile";
import InputText from "../../common/InputText";

type NewCategoryProps = {
    refetch: () => void;
};

const NewCategory = ({ refetch }: NewCategoryProps) => {
    const { mutateAsync: createCategory } = trpc.useMutation(["manage.createCategory"]);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [categoryColor, setCategoryColor] = useState("#9f9f9f");
    const [file, setFile] = useState(null);

    const handleCreateCategory = async () => {
        await createCategory({ color: categoryColor, name });
        refetch();
        setIsOpen(false);
    };

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>Dodaj kategorie</Button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className=" flex min-h-full items-center justify-center p-1 text-center small:p-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="h-full w-full max-w-md transform overflow-hidden rounded-2xl bg-primary p-6 pb-20 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-secondary">
                                        Nowa kategoria
                                    </Dialog.Title>

                                    <div className="text-light">
                                        <label htmlFor="name">Wprowadź nazwę oraz wybierz kolor</label>
                                        <div className="z-50 flex items-center gap-2 rounded-md p-2" style={{ backgroundColor: categoryColor }}>
                                            <ColorSelector select={setCategoryColor} />
                                            <InputText value={name} handleChange={e => setName(e.target.value)} name="name" />
                                        </div>
                                    </div>

                                    <div className="mt-4 flex">
                                        <Button variant="secondary" onClick={closeModal}>
                                            Anuluj
                                        </Button>
                                        <Button onClick={() => handleCreateCategory()}>Dodaj</Button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default NewCategory;
