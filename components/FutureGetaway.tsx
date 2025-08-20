
import Image from "next/image";
import Link from "next/link";

const homes = [
  {
    title: "Seaside loft in Cape Town",
    location: "Western Cape, South Africa",
    price: "R1,250 / night",
    img: "/images/loft.avif", 
    desc: "Wake to Table Mountain views and coastal breezes in a light-filled loft.",
  },
  {
    title: "Urban nook in Johannesburg",
    location: "Gauteng, South Africa",
    price: "R980 / night",
    img: "/images/photo-1.avif",
    desc: "Cozy studio near cafes and galleries—perfect for a weekend hop.",
  },
  {
    title: "Garden cottage in Durban North",
    location: "KwaZulu-Natal, South Africa",
    price: "R1,100 / night",
    img: "/images/garden.avif",
    desc: "Leafy retreat with a sunny patio and quick beach access.",
  },
];

export default function FutureGetaway() {
  return (
    <section className="border-t bg-background">
      <div className="container mx-auto px-5 lg:px-10 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-3xl font-semibold tracking-tight">Future getaways</h2>
          <Link
            href="#"
            className="text-sm hover:text-[#ff385c] transition-colors"
          >
            See all
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homes.map((h, i) => (
            <article
              key={`${h.title}-${i}`}
              className="group rounded-2xl overflow-hidden border bg-card"
            >
              <div className="relative h-56">
                <Image
                  src={h.img}
                  alt={h.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  priority={i === 0}
                />
              </div>

              <div className="p-4 space-y-1">
                <h3 className="text-base font-semibold">{h.title}</h3>
                <p className="text-sm text-muted-foreground">{h.location}</p>
                <p className="text-sm">{h.price}</p>
                <p className="text-sm text-muted-foreground mt-2">{h.desc}</p>

                <div className="pt-3">
                  <button
                    className="inline-flex items-center justify-center rounded-full px-4 py-2 bg-[#ff385c] text-white hover:bg-[#e03153] transition-colors cursor-pointer"
                    type="button"
                  >
                    View details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
