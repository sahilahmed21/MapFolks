"use client"

import Link from "next/link"
import { Menu, Bell, Home, LayoutDashboard, Users, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebar } from "@/hooks/use-sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="border-b border-custom-secondary bg-custom-background sticky top-0 z-50">
      <div className="flex h-16 items-center px-4 sm:px-6">
        {/* Mobile Menu Toggle */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 text-custom-primary hover:bg-custom-accent hover:text-custom-primary md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-custom-background border-r border-custom-secondary p-0">
            <div className="flex h-16 items-center border-b border-custom-secondary px-4">
              <h1 className="font-bold text-lg text-custom-primary">Profile App</h1>
            </div>
            <nav className="grid gap-1 p-4">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-custom-accent hover:text-custom-primary"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
              <Link
                href="/admin"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-custom-accent hover:text-custom-primary"
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Admin Dashboard</span>
              </Link>
              <Link
                href="/profiles"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-custom-accent hover:text-custom-primary"
              >
                <Users className="h-5 w-5" />
                <span>Profiles</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-custom-accent hover:text-custom-primary"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex text-custom-primary hover:bg-custom-accent hover:text-custom-primary"
          onClick={toggleSidebar}
        >


          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <h1 className="font-bold text-2xl text-custom-primary  tracking-wide shadow-md  ml-6">
          MapFolks
        </h1>


        {/* Right Side: Notifications and User Menu */}
        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-custom-primary hover:bg-custom-accent hover:text-custom-primary"
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full p-0">
                <Avatar className="h-8 w-8 border border-custom-secondary">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="bg-custom-primary text-custom-background">U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-custom-background border-custom-secondary w-48">
              <DropdownMenuLabel className="text-custom-primary">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-custom-secondary" />
              <DropdownMenuItem className="text-muted-foreground hover:bg-custom-accent hover:text-custom-primary">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-muted-foreground hover:bg-custom-accent hover:text-custom-primary">
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-custom-secondary" />
              <DropdownMenuItem className="text-muted-foreground hover:bg-custom-accent hover:text-custom-primary">
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header >
  )
}