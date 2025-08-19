
"use client";

import { useParams } from "next/navigation";
import { createLocation } from "@/app/actions";
import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import { useCountries } from "@/app/lib/getCountries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LazyMap = dynamic(() => import("@/app/components/Map"), {
  ssr: false,
  loading: () => <Skeleton className="h-[50vh] w-full" />,
});

export default function AddressRoute() {
  const { id } = useParams<{ id: string }>();

  const { getAllCountries, getCountryByValue } = useCountries();
  const [provinceCode, setProvinceCode] = useState(""); // e.g. "GP"
  const [pin, setPin] = useState<[number, number] | null>(null);

  const selected = useMemo(
    () => (provinceCode ? getCountryByValue(provinceCode) : undefined),
    [provinceCode, getCountryByValue]
  );

  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
          Where is your Home located?
        </h2>
      </div>

      <form action={createLocation}>
        <input type="hidden" name="homeId" value={id} />
       
        <input type="hidden" name="countryValue" value={selected?.label ?? ""} />
        
        <input type="hidden" name="lat" value={pin?.[0] ?? ""} />
        <input type="hidden" name="lng" value={pin?.[1] ?? ""} />

        <div className="w-3/5 mx-auto mb-36">

          <div className="mb-5">
            <Select
              required
              value={provinceCode}
              onValueChange={(v) => {
                setProvinceCode(v);
               
                setPin(null);
              }}
            >
              <SelectTrigger className="w-full cursor-pointer rounded-xl
                hover:border-[#ff385c]
                 focus-visible:ring-2 focus-visible:ring-[#ff385c]
               focus-visible:border-[#ff385c] focus:ring-0
               data-[state=open]:border-[#ff385c]
                data-[state=open]:ring-2 data-[state=open]:ring-[#ff385c]">
                <SelectValue placeholder="Select a province">
                  {selected ? `${selected.flag} ${selected.label}` : "Select a province"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Provinces</SelectLabel>
                  {getAllCountries().map((p) => (
                    <SelectItem key={p.value} value={p.value} className="
                      cursor-pointer
                       focus:bg-[#ffe9ef] focus:text-[#ff385c]
                      data-[highlighted]:bg-[#ffe9ef] data-[state=checked]:text-[#ff385c]
                        "
                    >
                      {p.flag} {p.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>


          <div className="mb-3 rounded-xl border p-3 text-sm">
            {selected ? (
              <>
                Selected province: <strong>{selected.label}</strong>
                {pin ? (
                  <> — Pin: <code>{pin[0].toFixed(4)}, {pin[1].toFixed(4)}</code></>
                ) : (
                  <> — click on the map to drop a pin near your city</>
                )}
              </>
            ) : (
              <>Choose a province, then click on the map to place your pin.</>
            )}
          </div>

          <LazyMap
            locationValue={provinceCode}
            onPick={(p) => setPin(p)}
          />
        </div>

        <CreationBottomBar />
      </form>
    </>
  );
}
