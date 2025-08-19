import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import ShopAirbnb from "@/components/ShopAirbnb";
import FutureGetaway from "@/components/FutureGetaway";
import DiscoverExperiences from "@/components/DiscoverExperiences";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb-clone | Tamule Waites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      
        <FutureGetaway />
        <DiscoverExperiences/> 
        <ShopAirbnb />
               <SiteFooter />
      </body>
    </html>
  );
}
