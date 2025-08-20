
"use client";

import Link from "next/link";
import { categoryItems } from "../lib/categoryItems";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

export const MapFilterItems = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    
    <div className="w-full flex justify-center">
    
      <div className="inline-flex gap-x-10 mt-5 max-w-full overflow-x-auto no-scrollbar px-2 lg:px-4">
        {categoryItems.map((item) => (
          <Link
            key={item.id}
            href={pathname + "?" + createQueryString("filter", item.name)}
            className={cn(
              search === item.name
                ? "border-b-2 border-black pb-2 flex-shrink-0"
                : "opacity-70 flex-shrink-0",
              "flex flex-col gap-y-3 items-center cursor-pointer"
            )}
          >
            <div className="relative w-6 h-6">
              <Image
                src={item.imageUrl}
                alt="category image"
                className="w-6 h-6"
                width={24}
                height={24}
              />
            </div>
            <p className="text-xs font-medium">{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
