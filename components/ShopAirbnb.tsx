
import Image from "next/image";
import { Button } from "@/app/component/ui/button";

export default function ShopAirbnb() {
  return (
    <section className="border-t bg-background">
      <div className="container mx-auto px-5 lg:px-10 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
       
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight">Shop Airbnb</h2>
            <p className="text-muted-foreground">
              Discover travel essentials, cozy home decor, and exclusive merch to bring the Airbnb vibe home.
            </p>
            <div>
             <Button className="rounded-full bg-[#ff385c] text-white hover:bg-[#e03153] cursor-pointer">
             Shop now
            </Button>

            </div>
          </div>

    
          <div className="relative h-64 md:h-80 lg:h-96">
            <Image
              src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4" 
              alt="Shop Airbnb"
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
