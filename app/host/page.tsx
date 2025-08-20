
import { redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";

export default async function HostPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

 
  if (!user?.id) {
    redirect("/api/auth/register?post_login_redirect_url=/host");
  }

  
  const data = await prisma.home.findFirst({
    where: { userId: user.id },
    orderBy: { createdAT: "desc" },
    select: {
      id: true,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
  });

  if (!data) {
    const created = await prisma.home.create({ data: { userId: user.id } });
    redirect(`/create/${created.id}/structure`);
  }

  if (!data.addedCategory && !data.addedDescription && !data.addedLocation) {
    redirect(`/create/${data.id}/structure`);
  }

  if (data.addedCategory && !data.addedDescription) {
    redirect(`/create/${data.id}/description`);
  }

  if (data.addedCategory && data.addedDescription && !data.addedLocation) {
    redirect(`/create/${data.id}/address`);
  }

  
  const created = await prisma.home.create({ data: { userId: user.id } });
  redirect(`/create/${created.id}/structure`);
}
