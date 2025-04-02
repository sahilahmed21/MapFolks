"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import ProfileCard from "@/components/profile-card"
import SearchFilter from "@/components/search-filter"
import { getProfiles } from "@/lib/api"

export default function Home() {
  const [profiles, setProfiles] = useState<{ id: string; name: string; location: string; title: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const { toast } = useToast()

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true)
        const data = await getProfiles()
        setProfiles(data)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch profiles:", err)
        setError("Failed to load profiles. Please try again.")
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profiles. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfiles()
  }, [toast])

  // Get unique locations for the filter dropdown
  const uniqueLocations = useMemo(() => {
    const locations = profiles.map((profile) => profile.location)
    return [...new Set(locations)]
  }, [profiles])

  // Filter profiles based on search query and location filter
  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      const matchesSearch =
        profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.title.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesLocation = locationFilter === "all" || profile.location === locationFilter

      return matchesSearch && matchesLocation
    })
  }, [profiles, searchQuery, locationFilter])

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value)
  }, [])

  const handleLocationChange = useCallback((value: string) => {
    setLocationFilter(value)
  }, [])

  const clearSearch = () => {
    setSearchQuery("")
    setLocationFilter("all")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-custom-primary">Profiles Directory</h1>

      <SearchFilter
        onSearchChange={handleSearchChange}
        onLocationChange={handleLocationChange}
        locations={uniqueLocations}
        initialSearch={searchQuery}
        initialLocation={locationFilter}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="space-y-4 border border-custom-secondary rounded-lg p-4">
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-12 rounded-full bg-custom-secondary" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px] bg-custom-secondary" />
                    <Skeleton className="h-4 w-[100px] bg-custom-secondary" />
                  </div>
                </div>
                <Skeleton className="h-4 w-[120px] bg-custom-secondary" />
                <Skeleton className="h-20 w-full bg-custom-secondary" />
                <div className="flex gap-2">
                  <Skeleton className="h-9 w-[100px] bg-custom-secondary" />
                  <Skeleton className="h-9 w-[100px] bg-custom-secondary" />
                </div>
              </div>
            ))}
        </div>
      ) : error ? (
        <Alert variant="destructive" className="bg-custom-background border-custom-secondary">
          <AlertCircle className="h-4 w-4 text-custom-primary" />
          <AlertTitle className="text-custom-primary">Error</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            {error}
            <div className="mt-4">
              <Button
                onClick={() => window.location.reload()}
                className="bg-custom-primary text-custom-background hover:bg-custom-primary/90"
              >
                Try Again
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ) : filteredProfiles.length === 0 ? (
        <Alert className="bg-custom-background border-custom-secondary">
          <AlertCircle className="h-4 w-4 text-custom-primary" />
          <AlertTitle className="text-custom-primary">No profiles found</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            No profiles found matching your search criteria.
            <div className="mt-4">
              <Button
                onClick={clearSearch}
                className="bg-custom-primary text-custom-background hover:bg-custom-primary/90"
              >
                Clear Search
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}
    </div>
  )
}

