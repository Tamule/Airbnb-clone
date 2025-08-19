A full-stack Airbnb-style rental app focused on South Africa. Create and manage listings, search by province, save favorites, and book with disabled date ranges—built with Next.js 15 (App Router + Server Actions), Prisma + PostgreSQL, Kinde Auth, and Supabase Storage.

✨ Features

Auth & Hosting

Kinde sign-in/up + “Become a host” flow that routes to the create-listing wizard

Multi-step listing creator: Category → Description (photos, price, counts) → Address (SA map)

Listings & Media

Image upload to Supabase Storage (images bucket, public)

SA-specific location: province dropdown + click-to-pin on Leaflet map

Favorites (add/remove) with UI feedback and cache revalidation

Search & Filters

Compact search modal → pushes query params (country, guest, room, bathroom)

Server-filtered results (Prisma) using searchParams (Next 15 compatible)

Reservations

DateRange picker with disabledDates based on existing reservations

Hidden start/end fields; optional back-to-back rule

UI/UX

Tailwind v4 + shadcn/ui, Airbnb pink theming

SA sections: “Discover Experiences”, “ShopAirbnb”, “Future Getaways”

Responsive navbar with Become a host next to UserNav

🧱 Tech Stack

Next.js 15 (App Router, Server Actions, params as Promise)

React 19 (useFormStatus from react-dom)

Prisma ORM + PostgreSQL

Kinde authentication

Supabase Storage for images

Leaflet / react-leaflet (South Africa focus)

Tailwind CSS v4 + shadcn/ui

⚙️ Setup
# 1) Install deps
npm i

# 2) Env vars
cp .env.example .env.local
# fill in values (see below)

# 3) Prisma
npx prisma generate
npx prisma migrate dev

# 4) Run
npm run dev

.env.local (example)
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/airbnb_sa"

# Kinde Auth
KINDE_ISSUER_URL=""
KINDE_CLIENT_ID=""
KINDE_CLIENT_SECRET=""
KINDE_SITE_URL="http://localhost:3000"
KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000/host"
KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000/"

# Supabase Storage
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""

# (optional) Next image remote hosts if you use remote placeholders
# next.config.(js|mjs): images.remotePatterns for images.unsplash.com, etc.

Supabase

Create a public bucket named images.

Use the public URL base in your image src (already wired in code).

🗺️ South Africa Map

Province Select (code or label) → map recenters

Click to drop a pin; lat/lng can be submitted with the form

Leaflet CSS imported in the map component; dynamic import for SSR safety

