import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Button from "../../modules/common/Button";
import LoadingSpinner from "../../modules/common/LoadingSpinner";
import Modal from "../../modules/common/Modal";
import TextArea from "../../modules/common/TextArea";
import PlaceType from "../../modules/place/PlaceTypeIcon";
import DeletePlace from "../../modules/user-place/DeletePlace";
import EditDescription from "../../modules/user-place/EditDescription";
import EditImages from "../../modules/user-place/EditImages";
import EditName from "../../modules/user-place/EditName";
import EditPlaceType from "../../modules/user-place/EditPlaceType";
import { trpc } from "../../utils/trpc";

const UserPlace = () => {
    const { query } = useRouter();
    const id = query.id as string;
    const userPlace = trpc.useQuery(["protectedPlace.getUserPlace", { id }]);

    useEffect(() => {
        console.log(userPlace);
    }, [userPlace]);

    if (userPlace.isLoading) return <LoadingSpinner />;

    return (
        <div className="w-full max-w-lg">
            <EditImages />
            {userPlace.data?.displayName && <EditName placeId={id} displayName={userPlace.data?.displayName} />}
            {userPlace.data?.description && <EditDescription placeId={id} description={userPlace.data?.description} />}
            {userPlace.data?.type && <EditPlaceType placeId={id} placeTypeId={userPlace.data.type.id} />}
            <DeletePlace id={id} />
        </div>
    );
};

export default UserPlace;
