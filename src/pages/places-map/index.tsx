import { PlaceType } from "@prisma/client";
import type { NextPage } from "next";
import { prisma } from "../../server/db/client";
import dynamic from "next/dynamic";
import PlaceDetailsModal from "../../modules/places-map/details-modal/PlaceDetailsModal";
import PlaceTypeFilter from "../../modules/places-map/PlaceTypeFilter";

type PlacesMapProps = {
  placeTypes: PlaceType[];
};

const PlacesMap: NextPage<PlacesMapProps> = ({ placeTypes }) => {
  const PlacesMap = dynamic(
    () => import("../../modules/places-map/PlacesMap"),
    { ssr: false }
  );

  return (
    <div className="absolute inset-0 top-16  mx-auto w-screen max-w-screen-large small:block">
      <div className="max-h-container-screen relative flex h-full w-full max-w-screen-large">
        <PlaceTypeFilter placeTypes={placeTypes} />
        <PlacesMap />
      </div>
      <PlaceDetailsModal />
    </div>
  );
};

export default PlacesMap;

export async function getStaticProps() {
  const placeTypes = await prisma.placeType.findMany();
  return {
    props: {
      placeTypes,
    },
  };
}
