import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";
import { AddToFavoriteButton, DeleteFromFavoriteButton } from "./SubmitButtons";
import { addToFavorite, DeleteFromFavorite } from "../actions";

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavoriteList: boolean;
  favoriteId: string;
  homeId: string;
  pathName: string;
}

export function ListingCard({
  description,
  imagePath,
  location,
  price,
  userId,
  homeId,
  favoriteId,
  isInFavoriteList,
  pathName,
}: iAppProps) {
  const { getCountryByValue, getAllCountries } = useCountries();
  // supports either province code (e.g. "GP") or label (e.g. "Gauteng")
  const country =
    getCountryByValue(location) ||
    getAllCountries().find(
      (i) => i.label.toLowerCase() === (location || "").toLowerCase()
    );

  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://ofjavttrcpwmjzuefaap.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="image of home"
          fill
          className="rounded-lg h-full object-cover "
          sizes="(max-width: 768px) 100vw, 
         (max-width: 1200px) 50vw, 
         33vw"
          priority
        />

        {userId && (
          <div className="z-10 absolute top-2 right-2">
            {isInFavoriteList ? (
              <form action={DeleteFromFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>

      <Link href={`/home/${homeId}`} className="mt-2">
        <h3 className="font-medium text-base">
          {country?.flag} {country?.label ?? location}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
        <p className="pt-2 text-muted-foreground">
          <span className=" font-medium text-black">R{price} </span>/night
        </p>
      </Link>
    </div>
  );
}
