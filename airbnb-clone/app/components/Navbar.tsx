import Image from "next/image";
import Link from "next/link";
import logo from "../../public/airbnb-desktop.png";
import mobilelogo from "../../public/airbnb-mobile.webp";
import { UserNav } from "./UserNav";
import { SearchModalCompnent } from "./SearchComponent";

export function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href="/">
          <Image src={logo} alt="Desktop_logo" className="w-32 hidden lg:block" />
          <Image src={mobilelogo} alt="mobile_logo" className="block lg:hidden w-12" />
        </Link>

        <SearchModalCompnent />

        <div className="flex items-center gap-3">
          <Link
            href="/host"
            className="hidden sm:inline-flex items-center rounded-full px-3 py-2 text-sm font-medium
                       border cursor-pointer transition-colors
                       hover:border-[#ff385c] hover:text-[#ff385c]"
          >
            Become a host
          </Link>

          <UserNav />
        </div>
      </div>
    </nav>
  );
}
