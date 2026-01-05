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


## Getting Started

## What we have done so far?

1. 🌱 Navbar & Authentication

This project uses **Next.js App Router**, **shadcn/ui**, and **Stack Auth** to build a modern, server-driven navigation bar with authentication support.

---

## 🧭 Navbar Overview

The Navbar is implemented as a **Server Component** to take full advantage of Next.js App Router features such as:

- Server-side authentication
- No client-side auth loading state
- Better performance and security

### Features

- 🌱 App logo
- 🌿 Navigation links (Home, Plants)
- 🌙 Theme toggle (Light / Dark / System)
- 🔐 Authentication-aware UI
  - Sign In / Sign Out
  - User profile button

---

## 🏗️ Navbar Architecture
```
Navbar (Server Component)
├── Next.js Link
├── shadcn/ui Button
├── ModeToggle (Client Component)
├── Stack Auth (Server-side user)
└── Conditional Auth UI
```
---

## 🔐 Stack Auth Integration

Authentication is handled using **Stack Auth**, which provides:

- Server-first authentication
- Secure session handling
- Built-in sign-in / sign-out URLs
- Easy integration with Next.js App Router

### Why Stack Auth?

- Works perfectly with **Server Components**
- No manual JWT/session handling
- Clean separation of server & client logic

---



### this project is inspired by youtube channel [kenn Onirom](https://youtu.be/DupS46tLPn0?si=cT26UH0e2QwXeCkX)

github [kennoniom](https://github.com/andreikennethmoreno/nextjstemplate/tree/3b8f2ab59b3fbab1fe8d708dec975c9057da00cb)