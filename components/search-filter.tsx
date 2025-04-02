"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SearchFilter({
  onSearchChange,
  onLocationChange,
  locations = [],
  initialSearch = "",
  initialLocation = "all",
}) {
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [locationFilter, setLocationFilter] = useState(initialLocation)

  useEffect(() => {
    onSearchChange(searchQuery)
  }, [searchQuery, onSearchChange])

  useEffect(() => {
    onLocationChange(locationFilter)
  }, [locationFilter, onLocationChange])

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-custom-primary" />
        <Input
          type="search"
          placeholder="Search by name or location..."
          className="pl-8 pr-8 border-custom-secondary focus-visible:ring-custom-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-8 w-8 text-custom-primary hover:text-custom-primary/80 hover:bg-custom-secondary/20"
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Select value={locationFilter} onValueChange={setLocationFilter}>
        <SelectTrigger className="w-full md:w-[220px] border-custom-secondary bg-custom-background text-foreground focus:ring-custom-primary">
          <SelectValue placeholder="Filter by location" />
        </SelectTrigger>
        <SelectContent className="bg-custom-background border-custom-secondary">
          <SelectItem value="all" className="focus:bg-custom-accent focus:text-foreground">
            All Locations
          </SelectItem>
          {locations.map((location) => (
            <SelectItem key={location} value={location} className="focus:bg-custom-accent focus:text-foreground">
              {location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

