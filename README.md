This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Built by

[Torbate Esfahani Agency](https://torbatesfahaniagency.ir)

## CMS Setup

1) Create `.env` with:

```
DATABASE_URL="file:./dev.db"
CMS_ADMIN_EMAIL="admin@example.com"
CMS_ADMIN_PASSWORD="change-me"
CMS_SESSION_SECRET="replace-with-long-random-secret"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
ADMIN_ENABLED="true"
```

For production, set `CMS_ADMIN_PASSWORD_HASH` instead of `CMS_ADMIN_PASSWORD`
and keep `CMS_SESSION_SECRET` long and random.
Set `NEXT_PUBLIC_SITE_URL` in production (required for server-side CMS fetches).
Admin access is disabled unless `ADMIN_ENABLED` is explicitly set to `true`.

For production, set `DATABASE_URL` to your Postgres connection string.

2) Initialize Prisma:

```
npx prisma generate
npx prisma migrate dev --name init
```

3) Run the app:

```
npm run dev
```

Admin panel: `/admin`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
