import { PlaceType } from "@prisma/client";
import { prisma } from "../server/db/client";
import type { NextPage } from "next";
import { BiMapAlt } from "react-icons/bi";
import heroImgSrc from "../assets/hero-map-squares.svg";
import InternalLink from "../modules/common/links/InternalLink";
import AddPlaceEncouragement from "../modules/homepage/add-place-encouragement";
import PlaceTypesList from "../modules/homepage/place-types-list/PlaceTypesList";
import RecentlyAddedPlaces from "../modules/homepage/recent-activity/RecentlyAddedPlaces";
import RecentlyAddedReviews from "../modules/homepage/recent-activity/RecentlyAddedReviews";
import Image from "next/image";
import Link from "next/link";
import PlaceTypeIcon from "../modules/place/PlaceTypeIcon";
import HorizontalLine from "../modules/common/HorizontalLine";

type HomeProps = {
  placeTypes: PlaceType[];
  recentlyAddedPlaces: string;
  recentlyAddedReviews: string;
};

const Home: NextPage<HomeProps> = ({
  placeTypes,
  recentlyAddedPlaces,
  recentlyAddedReviews,
}) => {
  console.log("static props: !", placeTypes);

  return (
    <div className=" relative mt-0 w-full">
      <div className="bg-radial-dark absolute inset-0 mt-16 h-[100px]"></div>
      <div className="relative mx-auto max-w-screen-lg overflow-hidden p-2 pb-12">
        <h1 className="mt-6 bg-gradient-to-r  from-indigo-600 via-indigo-400 to-indigo-500 bg-clip-text pb-4 text-center text-4xl font-extrabold text-transparent sm:text-5xl">
          Eksploruj miejsca
          <span className="block"> które warto zobaczyć. </span>
        </h1>
        <p className="mx-auto mt-4 max-w-md px-4 text-sm  sm:leading-relaxed lg:max-w-xl">
          Odkryj niesamowite miejsca na całym świecie! Dodaj swoje ulubione
          miejsca na mapę, podziel się nimi z innymi użytkownikami i poznaj nowe
          miejsca, które możesz odwiedzić. U nas znajdziesz łowiska, miejsca na
          biwak, organizację imprez i wiele innych ciekawych miejsc.
        </p>

        <div className="relative mt-4 flex h-64 w-full flex-col items-center justify-center">
          <div className="mb-4 flex gap-4">
            {placeTypes.map((placeType) => (
              <Link
                href={`/places-map?typeId=${placeType.id}`}
                key={placeType.id}
                className=""
              >
                <PlaceTypeIcon placeType={placeType} size="md" />
              </Link>
            ))}
          </div>
          <InternalLink href="/places-map" variant="filled">
            <div className="flex items-center gap-1">
              <BiMapAlt className="text-2xl" /> Zobacz mape
            </div>
          </InternalLink>
          <Image
            className="-z-10 opacity-30 hover:opacity-40 "
            alt="decoration"
            src={heroImgSrc}
            fill
          />
        </div>
        <div className=""></div>
      </div>

      <RecentlyAddedPlaces
        recentlyAddedPlaces={JSON.parse(recentlyAddedPlaces)}
      />
      <RecentlyAddedReviews
        recentlyAddedReviews={JSON.parse(recentlyAddedReviews)}
      />
      <PlaceTypesList placeTypes={placeTypes} />
      <HorizontalLine />
      <AddPlaceEncouragement />
    </div>
  );
};
export default Home;

export async function getStaticProps() {
  const placeTypes = await prisma.placeType.findMany();
  const recentlyAddedPlaces = await prisma?.place.findMany({
    take: 3,
    include: {
      type: true,
      images: true,
    },
    orderBy: [{ createdAt: "desc" }],
    where: {
      NOT: { images: { none: { id: undefined } } },
    },
  });
  const recentlyAddedReviews = await prisma?.review.findMany({
    take: 3,
    include: { user: true, Place: { include: { images: true, type: true } } },
    orderBy: [{ createdAt: "desc" }],
  });

  return {
    props: {
      placeTypes,
      recentlyAddedPlaces: JSON.stringify(recentlyAddedPlaces),
      recentlyAddedReviews: JSON.stringify(recentlyAddedReviews),
    },
    revalidate: 60,
  };
}
