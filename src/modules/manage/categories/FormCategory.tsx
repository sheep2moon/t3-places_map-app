import React from "react";
import { FormValuesState } from "../../../pages/restaurant/categories";
import Button from "../../common/Button";
import ColorSelector from "../../common/color-selector";
import { IoAdd } from "react-icons/io5";
import InputText from "../../common/InputText";
import Modal from "../../common/Modal";

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
            <Button className="flex items-center gap-1" onClick={() => setIsModalOpen(true)}>
                <IoAdd className="text-xl" />
                Dodaj kategorie
            </Button>

            <Modal close={closeModal} isModalOpen={isModalOpen}>
                <h3 className="mb-4 text-xl font-medium leading-6 text-secondary">{formValues.isEdit ? "Edytujesz kategorie" : "Nowa kategoria"}</h3>

                <div className="text-light">
                    <label htmlFor="name">Wprowadź nazwę oraz wybierz kolor</label>
                    <div className="z-50 flex items-center gap-2 rounded-md p-2" style={{ backgroundColor: formValues.color }}>
                        <ColorSelector select={selectColor} />
                        <InputText value={formValues.name} handleChange={handleNameChange} name="name" />
                    </div>
                </div>

                <div className="mt-4 flex">
                    <Button variant="alternative" onClick={closeModal}>
                        Anuluj
                    </Button>
                    <Button onClick={() => handleConfirmForm()}>{formValues.isEdit ? "Aktualizuj" : "Dodaj"}</Button>
                </div>
            </Modal>
        </>
    );
};

export default FormCategory;
