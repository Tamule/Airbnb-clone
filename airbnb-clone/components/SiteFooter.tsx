
"use client";

import Link from "next/link";
import { Globe, Facebook, Twitter, Instagram } from "lucide-react";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "AirCover", href: "#" },
      { label: "Anti-discrimination", href: "#" },
      { label: "Disability support", href: "#" },
      { label: "Cancellation options", href: "#" },
    ],
  },
  {
    title: "Hosting",
    links: [
      { label: "Airbnb your home", href: "#" },
      { label: "AirCover for Hosts", href: "#" },
      { label: "Hosting resources", href: "#" },
      { label: "Community forum", href: "#" },
      { label: "Responsible hosting", href: "#" },
    ],
  },
  {
    title: "Airbnb",
    links: [
      { label: "Newsroom", href: "#" },
      { label: "New features", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Investors", href: "#" },
      { label: "Gift cards", href: "#" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Destinations", href: "#" },
      { label: "Experiences", href: "#" },
      { label: "Things to do", href: "#" },
      { label: "Top-rated stays", href: "#" },
      { label: "Travel tips", href: "#" },
    ],
  },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
    
      <div className="container mx-auto px-5 lg:px-10 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {columns.map((col) => (
            <div key={col.title} className="space-y-3">
              <h3 className="text-sm font-semibold">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground hover:text-[#ff385c] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

   
      <div className="border-t">
        <div className="container mx-auto px-5 lg:px-10 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-muted-foreground">
            © {year} Airbnb Clone ·
            <Link href="#" className="ml-2 hover:text-[#ff385c]">Privacy</Link> ·
            <Link href="#" className="ml-2 hover:text-[#ff385c]">Terms</Link> ·
            <Link href="#" className="ml-2 hover:text-[#ff385c]">Sitemap</Link>
          </div>

          <div className="flex items-center gap-5">
            <button className="inline-flex items-center gap-2 text-sm hover:text-[#ff385c]">
              <Globe className="h-4 w-4" />
              English (EN)
            </button>
            <button className="text-sm hover:text-[#ff385c]">ZAR</button>
            <div className="flex items-center gap-4">
              <Link href="#" aria-label="Instagram" className="hover:text-[#ff385c]">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" aria-label="Twitter" className="hover:text-[#ff385c]">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" aria-label="Facebook" className="hover:text-[#ff385c]">
                <Facebook className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
