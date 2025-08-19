'use client';
import { Heart, Loader2 } from "lucide-react";
import { Button } from "../component/ui/button";
import { useFormStatus } from "react-dom";

export function CreationSubmit() {
    const { pending } = useFormStatus();
    return  <>
     {pending ? (
        <Button disabled size='lg'>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait</Button>
     ): (
        <Button type="submit" className="bg-[#ff385d] text-white border-2 border-[#ff385d] hover:bg-white hover:text-[#ff385d] transition-colors cursor-pointer">Next</Button>
     )}
     </>;
}


export function AddToFavoriteButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          variant="outline"
          size="icon"
          disabled
          className="bg-primary-foreground cursor-not-allowed"
          aria-label="Adding to favorites"
        >
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="bg-primary-foreground cursor-pointer"
          type="submit"
          aria-label="Add to favorites"
        >
          <Heart className="w-4 h-4 pointer-events-none" />
        </Button>
      )}
    </>
  );
}

export function DeleteFromFavoriteButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          variant="outline"
          size="icon"
          disabled
          className="bg-primary-foreground"
        >
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="bg-primary-foreground "
          type="submit"
        >
          <Heart className="w-4 h-4 text-primary cursor-pointer" fill="#E21C49"  />
        </Button>
      )}
    </>
  );
}

export function ReservationSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
  {pending ? (
  <Button
    className="w-full bg-[#ff385c] text-white hover:bg-[#e03153] focus-visible:ring-2 focus-visible:ring-[#ff385c] focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none cursor-not-allowed"
    disabled
  >
    <Loader2 className="w-4 h-4 animate-spin mr-2" /> Please wait...
  </Button>
) : (
  <Button
    className="w-full bg-[#ff385c] text-white hover:bg-[#e03153] focus-visible:ring-2 focus-visible:ring-[#ff385c] focus-visible:ring-offset-2 cursor-pointer"
    type="submit"
  >
    Make a Reservation!
  </Button>
)}

    </>
  );
}