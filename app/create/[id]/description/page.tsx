import { Counter } from "@/app/components/Counter";
import { CreateDescription } from "@/app/actions";
import { CreationBottomBar } from "@/app/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function DescriptionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; 

  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Please describe your home.
        </h2>
      </div>

   
      <form action={CreateDescription} encType="multipart/form-data">
      
        <input type="hidden" name="homeId" value={id} />

        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input name="title" type="text" required placeholder="short and sweet" />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea name="description" required placeholder="Please describe your home" />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input name="price" type="number" placeholder="Price per night in Rand" min={300} />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Image</Label>
            <Input name="image" type="file" required />
          </div>

          <Card>
            <CardHeader className="gap-y-5">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Guests</h3>
                  <p className="text-muted-foreground text-sm">How many guests?</p>
                </div>
                <Counter name="guest" />
              </div>

              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Bedrooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many bedrooms does your home have?
                  </p>
                </div>
                <Counter name="room" />
              </div>

              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Bathrooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many bathrooms does your home have?
                  </p>
                </div>
                <Counter name="bathroom" />
              </div>
            </CardHeader>
          </Card>
        </div>

        <CreationBottomBar />
      </form>
    </>
  );
}
