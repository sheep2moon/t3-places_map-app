import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { FormValuesState } from "../../../pages/restaurant/categories";
import Button from "../../common/Button";
import ColorSelector from "../../common/color-selector";

import InputText from "../../common/InputText";

type NewCategoryProps = {
    isModalOpen: boolean;
    setIsModalOpen: (v: boolean) => void;
    formValues: FormValuesState;
    setFormValues: (v: FormValuesState) => void;
    handleConfirmForm: () => void;
};

const FormCategory = ({ isModalOpen, setIsModalOpen, formValues, setFormValues, handleConfirmForm }: NewCategoryProps) => {
    const selectColor = (c: string) => {
        const newState = { ...formValues, color: c };
        setFormValues(newState);
    };
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newState = { ...formValues, name: e.target.value };
        setFormValues(newState);
    };
    // const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={() => setIsModalOpen(true)}>Dodaj kategorie</Button>

            <Transition appear show={isModalOpen} as={Fragment}>
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
                                        {formValues.isEdit ? "Edytujesz kategorie" : "Nowa kategoria"}
                                    </Dialog.Title>

                                    <div className="text-light">
                                        <label htmlFor="name">Wprowadź nazwę oraz wybierz kolor</label>
                                        <div className="z-50 flex items-center gap-2 rounded-md p-2" style={{ backgroundColor: formValues.color }}>
                                            <ColorSelector select={selectColor} />
                                            <InputText value={formValues.name} handleChange={handleNameChange} name="name" />
                                        </div>
                                    </div>

                                    <div className="mt-4 flex">
                                        <Button variant="secondary" onClick={closeModal}>
                                            Anuluj
                                        </Button>
                                        <Button onClick={() => handleConfirmForm()}>{formValues.isEdit ? "Aktualizuj" : "Dodaj"}</Button>
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

export default FormCategory;
