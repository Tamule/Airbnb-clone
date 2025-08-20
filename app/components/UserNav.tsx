import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { createAirbnbHome } from "@/app/actions";


export async function UserNav() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const createHomeWithId = createAirbnbHome.bind(null, {
        userId: user?.id as string,
    });

    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3 cursor-pointer">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
                <img src='https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'  alt="user-icon"           
                        className="rounded-full h-8 w-8 hidden lg:block"
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
               {user ? (
                <>
                 <DropdownMenuItem asChild>
                   <form  action={createHomeWithId} className="w-full">
                    <button type="submit" className="w-full text-start cursor-pointer">
                        Airbnb Your Home
                    </button>
                   </form>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href='/my-homes' className='w-full'>
                    My Listings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                 <DropdownMenuItem>
                    <Link href='/favorites' className='w-full'>
                    My Favorites
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                 <DropdownMenuItem>
                    <Link href='/reservations' className='w-full'>
                    My Reservations
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                     <DropdownMenuItem>
                        <LogoutLink className="w-full">Logout</LogoutLink>
                </DropdownMenuItem>
                </>
               ) : (
                <>
                 <DropdownMenuItem>
                    <RegisterLink className="w-full">Register</RegisterLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LoginLink className="w-full">Login</LoginLink>
                </DropdownMenuItem>
                </>
               )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}