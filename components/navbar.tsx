"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, Home, Library, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: Book },
  { name: "Collections", href: "/collections", icon: Library },
  { name: "Profile", href: "/profile", icon: User },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <Book className="h-6 w-6" />
            <span className="font-bold">Briefly</span>
          </Link>
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.name}
                  variant={pathname === item.href ? "default" : "ghost"}
                  className="flex items-center space-x-2"
                  asChild
                >
                  <Link href={item.href}>
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </Button>
              )
            })}
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}