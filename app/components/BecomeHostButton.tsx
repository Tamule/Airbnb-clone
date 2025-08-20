
"use client";

import Link from "next/link";

export default function BecomeHostButton() {
  return (
    <Link
      href="/host"
      className="hidden sm:inline-flex items-center rounded-full px-3 py-2 text-sm font-medium
                 border cursor-pointer transition-colors
                 hover:border-[#ff385c] hover:text-[#ff385c]"
    >
      Become a host
    </Link>
  );
}
