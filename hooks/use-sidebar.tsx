"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useMobile } from "@/hooks/use-mobile"

const SidebarContext = createContext({
  isOpen: true,
  toggleSidebar: () => {},
})

export function SidebarProvider({ children }) {
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(true)

  // Close sidebar by default on mobile
  useEffect(() => {
    setIsOpen(!isMobile)
  }, [isMobile])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>{children}</SidebarContext.Provider>
}

export const useSidebar = () => useContext(SidebarContext)

