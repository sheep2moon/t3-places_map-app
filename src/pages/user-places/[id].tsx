import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import LoadingSpinner from "../../modules/common/LoadingSpinner";
import DeletePlace from "../../modules/user-place/DeletePlace";
import EditDescription from "../../modules/user-place/EditDescription";
import EditImages from "../../modules/user-place/EditImages";
import EditName from "../../modules/user-place/EditName";
import EditPlaceType from "../../modules/user-place/EditPlaceType";
import EditPrices from "../../modules/user-place/EditPrices";
import { trpc } from "../../utils/trpc";

const UserPlace = () => {
    const { query } = useRouter();
    const id = query.id as string;
    const { data, isLoading } = trpc.useQuery(["protectedPlace.getUserPlace", { id }]);

    if (isLoading) return <LoadingSpinner />;
    const EditPosition = dynamic(() => import("../../modules/user-place/EditPosition"), { ssr: false });

    return (
        <div className="w-full max-w-2xl pt-4 pb-16">
            {data?.lat && data?.lng && <EditPosition placeId={id} position={{ lat: data.lat, lng: data.lng }} />}
            <EditImages />
            {data?.displayName && <EditName placeId={id} displayName={data?.displayName} />}
            {data?.description && <EditDescription placeId={id} description={data?.description} />}
            {data?.type && <EditPlaceType placeId={id} placeTypeId={data.type.id} />}
            {data?.prices && <EditPrices isPaid={data.isPaid} placeId={id} prices={JSON.parse(data.prices)} />}
            <DeletePlace id={id} />
        </div>
    );
};

export default UserPlace;
