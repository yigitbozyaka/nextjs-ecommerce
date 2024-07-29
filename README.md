
A next.js project for ecommerce business.

# Next.js Rv Selling Website

Used; Next.js, TypeScript, MongoDB, Prisma, StripeApi and TailwindCSS.

# Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Setup .env file with your informations:

```bash
NEXT_PUBLIC_URL =URL_HERE
NEXTAUTH_URL=URL_HERE
DATABASE_URL ="URL_HERE"
NEXTAUTH_EMAIL=ADMIN_MAIL_HERE
NEXTAUTH_PASSWORD=ADMIN_PASSWORD_HERE
SECRET=A_RANDOM_LONG_STRING
NEXT_PUBLIC_STRIPE_SECRET_KEY=KEY_STARTS_WITH_sk
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=KEY_STARTS_WITH_pk
```

After that you can easily start your development server:

but before that you have to generate Prisma

```bash
npx prisma generate
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Also for the admin panel you can login in [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Then start adding rv's in here [http://localhost:3000/admin/add-rvs](http://localhost:3000/admin/add-rvs)

# Dependencies

I've used [MongoDB](https://mongodb.com/) to store rv details and user details. [HeroIcons](https://heroicons.com/) for icons. [SWR](https://swr.vercel.app/) to fetch datas from database.

# Copyright

Feel free to use this.


