"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Settings, LayoutDashboard } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/hooks/use-sidebar"

export default function Sidebar() {
  const pathname = usePathname()
  const { isOpen } = useSidebar()

  const routes = [
    {
      label: "Home",
      icon: Home,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Admin Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      active: pathname === "/admin",
    },
    // {
    //   label: "Profiles",
    //   icon: Users,
    //   href: "/profiles",
    //   active: pathname.startsWith("/profiles"),
    // },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: pathname === "/settings",
    },
  ]

  return (
    <div
      className={cn(
        "fixed inset-y-0 z-40 flex h-full flex-col border-r border-custom-secondary bg-custom-background transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-0 md:w-16",
        // Add a custom class to apply the sidebar width as a CSS variable
        isOpen ? "sidebar-open" : "sidebar-closed"
      )}
    >
      <div className="flex h-16 items-center justify-center border-b border-custom-secondary px-4">
        <h1
          className={cn(
            "font-bold text-lg text-custom-primary transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0 md:opacity-0"
          )}
        >
          MapFolks
        </h1>
        <div
          className={cn(
            "flex items-center justify-center transition-opacity duration-300",
            isOpen ? "opacity-0 w-0" : "opacity-100 md:opacity-100"
          )}
        >
          <span className="text-xl font-bold text-custom-primary">P</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-1 px-2">
          {routes.map((route, i) => (
            <Link
              key={i}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-200",
                route.active
                  ? "bg-custom-accent text-custom-primary font-medium"
                  : "text-muted-foreground hover:bg-custom-accent hover:text-custom-primary"
              )}
            >
              <route.icon
                className={cn("h-5 w-5 shrink-0", route.active ? "text-custom-primary" : "text-muted-foreground")}
              />
              <span
                className={cn(
                  "transition-opacity duration-300 whitespace-nowrap",
                  isOpen ? "opacity-100" : "opacity-0 md:opacity-0"
                )}
              >
                {route.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}