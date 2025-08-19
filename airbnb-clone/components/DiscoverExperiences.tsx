
import Image from "next/image";
import Link from "next/link";

export default function DiscoverExperiences() {
  return (
    <section className="border-t bg-background">
      <div className="container mx-auto px-5 lg:px-10 py-12">
        <h2 className="text-3xl font-semibold tracking-tight mb-6">
          Discover Airbnb Experiences
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
       
          <article className="relative h-64 sm:h-80 lg:h-96 overflow-hidden rounded-3xl">
            <Image
              src="/images/landscape1.avif" 
              alt="Things to do on your trip"
              fill
              className="object-cover"
              priority
            />
          
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-center">
              <h3 className="text-white text-2xl sm:text-3xl font-semibold drop-shadow">
                Things to do on your trip
              </h3>
              <div className="mt-4">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-full bg-white text-black px-5 py-2 shadow
                             hover:bg-[#ff385c] hover:text-white transition-colors focus-visible:outline-none
                             focus-visible:ring-2 focus-visible:ring-[#ff385c]"
                >
                  Experiences
                </Link>
              </div>
            </div>
          </article>

        
          <article className="relative h-64 sm:h-80 lg:h-96 overflow-hidden rounded-3xl">
            <Image
              src="/images/landscape1.avif" 
              alt="Things to do from home"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-center">
              <h3 className="text-white text-2xl sm:text-3xl font-semibold drop-shadow">
                Things to do from home
              </h3>
              <div className="mt-4">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-full bg-white text-black px-5 py-2 shadow
                             hover:bg-[#ff385c] hover:text-white transition-colors focus-visible:outline-none
                             focus-visible:ring-2 focus-visible:ring-[#ff385c]"
                >
                  Online Experiences
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
