"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

type NavLinkProps = {
  href: string
  children: React.ReactNode
  exact?: boolean
}

export function NavLink({ href, children, exact = true }: NavLinkProps) {
  const pathname = usePathname()

  const isActive = exact
    ? pathname === href
    : pathname.startsWith(href)

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          variant: isActive ? "secondary" : "ghost",
        }),
        "flex items-center gap-2 transition-colors"
      )}
    >
      {children}
    </Link>
  )
}
