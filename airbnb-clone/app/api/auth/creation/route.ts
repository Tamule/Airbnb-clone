
import prisma from '@/app/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    
    throw new Error('Something went wrong...');
  }

const profileImage = (user as any).picture ?? (user as any).profile_image ?? ''

  let dbUser = await prisma.user.findUnique({
  where: { id: user.id },
});

if (!dbUser) {
  dbUser = await prisma.user.create({
    data: {
      id: user.id,
      email: user.email ?? '',
      firstName: user.given_name ?? '',
      lastName: user.family_name ?? '',
      profileImage,
    },
  });
}
const site = process.env.KINDE_SITE_URL || 'http://localhost:3000';
  return NextResponse.redirect(new URL('/', site));
}
