

import { Suspense, use } from "react";
import type { Prisma } from "@prisma/client";

import { MapFilterItems } from "./components/MapFilterItems";
import prisma from "./lib/db";
import { SkeletonCard } from "./components/SkeletonCard";
import { NoItems } from "./components/NoItem";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ListingCard } from "./components/ListingCard";
import { unstable_noStore as noStore } from "next/cache";

type SearchParams = {
  filter?: string | string[];
  country?: string | string[];
  guest?: string | string[];
  room?: string | string[];
  bathroom?: string | string[];
};

const first = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v) ?? undefined;

async function getData({
  searchParams,
  userId,
}: {
  userId: string | undefined;
  searchParams?: SearchParams;
}) {
  noStore();

 
  const where: Prisma.HomeWhereInput = {
    addedCategory: true,
    addedLocation: true,
    addedDescription: true,
    ...(first(searchParams?.filter) ? { categoryName: first(searchParams?.filter)! } : {}),
    ...(first(searchParams?.country) ? { country: first(searchParams?.country)! } : {}),
    ...(first(searchParams?.guest) ? { guests: first(searchParams?.guest)! } : {}),
    ...(first(searchParams?.room) ? { bedrooms: first(searchParams?.room)! } : {}),
    ...(first(searchParams?.bathroom) ? { bathrooms: first(searchParams?.bathroom)! } : {}),
  };

  
  const data = (await prisma.home.findMany({
    where,
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: userId ? { userId } : undefined,
        select: { id: true },
      },
    },
  })) as Array<{
    photo: string | null;
    id: string;
    price: number | null;
    description: string | null;
    country: string | null;
    Favorite: { id: string }[];
  }>;

  return data;
}

export default function Home({
  searchParams,
}: {
 
  searchParams: Promise<SearchParams>;
}) {
  const sp = use(searchParams);

  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />
      <Suspense key={first(sp?.filter) ?? ""} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={sp} />
      </Suspense>
    </div>
  );
}

async function ShowItems({ searchParams }: { searchParams?: SearchParams }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ searchParams, userId: user?.id });

  if (data.length === 0) {
    return (
      <NoItems
        title="Sorry, no listings found for this category..."
        description="Please check another category or create your own listing!"
      />
    );
  }

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      {data.map((item) => (
        <ListingCard
          key={item.id}
          description={item.description as string}
          imagePath={item.photo as string}
          location={item.country as string}
          price={item.price as number}
          userId={user?.id}
          favoriteId={item.Favorite[0]?.id}
          isInFavoriteList={(item.Favorite.length ?? 0) > 0}
          homeId={item.id}
          pathName="/"
        />
      ))}
    </div>
  );
}

function SkeletonLoading() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      {Array.from({ length: 9 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
