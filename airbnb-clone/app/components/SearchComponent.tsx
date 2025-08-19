// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { Search } from "lucide-react";
// import { useState } from "react";
// import { useCountries } from "../lib/getCountries";
// import  HomeMap  from "./HomeMap";
// import { Button } from "@/components/ui/button";
// import { CreationSubmit } from "./SubmitButtons";
// import { Card, CardHeader } from "@/components/ui/card";
// import { Counter } from "./Counter";

// export function SearchModalCompnent() {
//   const [step, setStep] = useState(1);
//   const [locationValue, setLocationValue] = useState("");
//   const { getAllCountries } = useCountries();

//   function SubmitButtonLocal() {
//     if (step === 1) {
//       return (
//         <Button onClick={() => setStep(step + 1)} type="button"
        
//         >
//           Next
//         </Button>
//       );
//     } else if (step === 2) {
//       return <CreationSubmit />;
//     }
//   }
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
//           <div className="flex h-full divide-x font-medium">
//             <p className="px-4">Anywhere</p>
//             <p className="px-4">Any Week</p>
//             <p className="px-4">Add Guests</p>
//           </div>

//           <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
//         </div>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <form className="gap-4 flex flex-col">
//           <input type="hidden" name="country" value={locationValue} />
//           {step === 1 ? (
//             <>
//               <DialogHeader>
//                 <DialogTitle>Select a Country</DialogTitle>
//                 <DialogDescription>
//                   Pleae Choose a Country, so that what you want
//                 </DialogDescription>
//               </DialogHeader>

//               <Select
//                 required
//                 onValueChange={(value) => setLocationValue(value)}
//                 value={locationValue}
//               >
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select a Country" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Countries</SelectLabel>
//                     {getAllCountries().map((item) => (
//                       <SelectItem key={item.value} value={item.value}>
//                         {item.flag} {item.label} / {item.region}
//                       </SelectItem>
//                     ))}
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//               <HomeMap locationValue={locationValue} />
//             </>
//           ) : (
//             <>
//               <DialogHeader>
//                 <DialogTitle>Select all the info you need</DialogTitle>
//                 <DialogDescription>
//                   Pleae Choose a Country, so that what you want
//                 </DialogDescription>
//               </DialogHeader>

//               <Card>
//                 <CardHeader className="flex flex-col gap-y-5">
//                   <div className="flex items-center justify-between">
//                     <div className="flex flex-col">
//                       <h3 className="underline font-medium">Guests</h3>
//                       <p className="text-muted-foreground text-sm">
//                         How many guests do you want?
//                       </p>
//                     </div>

//                     <Counter name="guest" />
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex flex-col">
//                       <h3 className="underline font-medium">Rooms</h3>
//                       <p className="text-muted-foreground text-sm">
//                         How many rooms do you have?
//                       </p>
//                     </div>

//                     <Counter name="room" />
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex flex-col">
//                       <h3 className="underline font-medium">Bathrooms</h3>
//                       <p className="text-muted-foreground text-sm">
//                         How many bathrooms do you have?
//                       </p>
//                     </div>

//                     <Counter name="bathroom" />
//                   </div>
//                 </CardHeader>
//               </Card>
//             </>
//           )}

//           <DialogFooter>
//             <SubmitButtonLocal />
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { useCountries } from "../lib/getCountries";
import HomeMap from "./HomeMap";
import { Button } from "@/components/ui/button";
import { CreationSubmit } from "./SubmitButtons";
import { Card, CardHeader } from "@/components/ui/card";
import { Counter } from "./Counter";
import { useRouter } from "next/navigation";

export function SearchModalCompnent() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [locationValue, setLocationValue] = useState("");
  const { getAllCountries, getCountryByValue } = useCountries();
  const router = useRouter();

  const selected = getCountryByValue(locationValue);

  function SubmitButtonLocal() {
    if (step === 1) {
      return (
        <Button onClick={() => setStep(2)} type="button">
          Next
        </Button>
      );
    } else if (step === 2) {
      // keep your existing submit button
      return <CreationSubmit />;
    }
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const params = new URLSearchParams();

    // country: send the province LABEL so it matches DB values
    const countryLabel = selected?.label ?? (fd.get("country") as string) ?? "";
    if (countryLabel) params.set("country", countryLabel);

    const guest = (fd.get("guest") as string) || "";
    const room = (fd.get("room") as string) || "";
    const bathroom = (fd.get("bathroom") as string) || "";

    if (guest) params.set("guest", guest);
    if (room) params.set("room", room);
    if (bathroom) params.set("bathroom", bathroom);

    router.push(`/?${params.toString()}`);

    // close & reset
    setOpen(false);
    setStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setStep(1); }}>
      <DialogTrigger asChild>
        <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
          <div className="flex h-full divide-x font-medium">
            <p className="px-4">Anywhere</p>
            <p className="px-4">Any Week</p>
            <p className="px-4">Add Guests</p>
          </div>
          <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form className="gap-4 flex flex-col" onSubmit={onSubmit}>
          <input type="hidden" name="country" value={locationValue} />

          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select a Country</DialogTitle>
                <DialogDescription>
                  Please choose a province in South Africa.
                </DialogDescription>
              </DialogHeader>

              <Select
                required
                onValueChange={(value) => setLocationValue(value)}
                value={locationValue}
              >
                <SelectTrigger className="w-full cursor-pointer hover:border-[#ff385c] focus-visible:ring-2 focus-visible:ring-[#ff385c]">
                  <SelectValue placeholder="Select a Province" />
                </SelectTrigger>
                <SelectContent className="cursor-pointer">
                  <SelectGroup>
                    <SelectLabel>Provinces</SelectLabel>
                    {getAllCountries().map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        className="cursor-pointer focus:bg-[#ffe9ef] focus:text-[#ff385c]"
                      >
                        {item.flag} {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <HomeMap locationValue={locationValue} />
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Select all the info you need</DialogTitle>
                <DialogDescription>Set guest/room/bathroom counts.</DialogDescription>
              </DialogHeader>

              <Card>
                <CardHeader className="flex flex-col gap-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Guests</h3>
                      <p className="text-muted-foreground text-sm">
                        How many guests do you want?
                      </p>
                    </div>
                    <Counter name="guest" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Rooms</h3>
                      <p className="text-muted-foreground text-sm">
                        How many rooms do you have?
                      </p>
                    </div>
                    <Counter name="room" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Bathrooms</h3>
                      <p className="text-muted-foreground text-sm">
                        How many bathrooms do you have?
                      </p>
                    </div>
                    <Counter name="bathroom" />
                  </div>
                </CardHeader>
              </Card>
            </>
          )}

          <DialogFooter>
            <SubmitButtonLocal />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
