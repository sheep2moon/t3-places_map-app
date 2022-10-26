import { unstable_getServerSession } from "next-auth";
import React, { useState } from "react";
import Button from "../../modules/common/Button";
import InputNumber from "../../modules/common/InputNumber";
import InputText from "../../modules/common/InputText";
import Modal from "../../modules/common/Modal";
import RestaurantLayout from "../../modules/layout/dashboard";
import { trpc } from "../../utils/trpc";
import { authOptions } from "../api/auth/[...nextauth]";

const Products = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const categoriesQuery = trpc.useQuery(["manage.getCategories"]);

    const [category, setCategory] = useState({});
    const handleConfirmForm = () => {
        //todo
    };

    return (
        <RestaurantLayout>
            <div className="flex flex-col">
                <Button onClick={() => setIsModalOpen(true)}>Dodaj</Button>
                <Modal isModalOpen={isModalOpen} close={() => setIsModalOpen(false)}>
                    <div className="text-light">
                        <h3 className="mb-4 text-xl font-medium leading-6 text-secondary">Nowy produkt</h3>
                        <span>Nazwa</span>
                        <InputText value={productName} handleChange={e => setProductName(e.target.value)} name="productName" />
                        <span>Cena</span>
                        <InputNumber value={productPrice} onChange={e => setProductPrice(parseInt(e.target.value))} />
                        <span>Kategoria</span>
                        {categoriesQuery.data && <SelectCategory items={categoriesQuery.data} selected={category} select={setCategory} />}
                        <div className="mt-4 flex">
                            <Button variant="alternative" onClick={() => setIsModalOpen(false)}>
                                Anuluj
                            </Button>
                            <Button onClick={() => handleConfirmForm()}>Dodaj</Button>
                        </div>
                    </div>
                </Modal>
                <ProductsList />
            </div>
        </RestaurantLayout>
    );
};

export default Products;

export async function getServerSideProps(context: any) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions);

    console.log("session", session);

    if (!session) {
        return {
            redirect: {
                destination: "/auth/signin",
                permanent: false
            }
        };
    } else {
        return { props: {} };
    }
}
