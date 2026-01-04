# plants-wensite-crud

This is a CRUD application for managing plants. It uses the following technologies:

- Next.js (App Router) → frontend + server
- Bun → runtime & package manager
- Hono → API routing
- TypeScript
- shadcn/ui + Tailwind → UI
- Prisma + PostgreSQL → database

## Structure

```pgsql
Next.js App
│
├── app/                ← UI + Routes
│   ├── page.tsx        ← Pages (Frontend)
│   ├── api/            ← API routes (Hono)
│
├── server/
│   ├── hono.ts         ← Hono app instance
│   ├── routes/         ← API logic
│
├── prisma/
│   ├── schema.prisma   ← DB schema
│
├── lib/
│   ├── prisma.ts       ← Prisma client
│
└── components/
    └── ui/             ← shadcn components

```

Frontend → calls /api/* → handled by Hono → Prisma → PostgreSQL

### this project is inspired by youtube channel [kenn Onirom](https://youtu.be/DupS46tLPn0?si=cT26UH0e2QwXeCkX)

github [kennoniom](https://github.com/andreikennethmoreno/nextjstemplate/tree/3b8f2ab59b3fbab1fe8d708dec975c9057da00cb)