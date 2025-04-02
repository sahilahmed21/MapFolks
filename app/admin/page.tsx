"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash2, Search, AlertCircle, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import ProfileForm from "@/components/profile-form"
import { getProfiles, addProfile, updateProfile, deleteProfile } from "@/lib/api"

export default function AdminPage() {
  const [profiles, setProfiles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [editingProfile, setEditingProfile] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
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

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddProfile = async (data) => {
    try {
      const newProfile = await addProfile(data)
      setProfiles([...profiles, newProfile])
      setIsAddDialogOpen(false)
      toast({
        title: "Profile Added",
        description: "The profile has been successfully added.",
        className: "bg-custom-accent border-custom-accent",
      })
    } catch (err) {
      console.error("Failed to add profile:", err)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add profile. Please try again.",
      })
    }
  }

  const handleUpdateProfile = async (data) => {
    try {
      const updatedProfile = await updateProfile(editingProfile.id, data)
      setProfiles(profiles.map((p) => (p.id === editingProfile.id ? updatedProfile : p)))
      setIsEditDialogOpen(false)
      setEditingProfile(null)
      toast({
        title: "Profile Updated",
        description: "The profile has been successfully updated.",
        className: "bg-custom-accent border-custom-accent",
      })
    } catch (err) {
      console.error("Failed to update profile:", err)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      })
    }
  }

  const handleDeleteProfile = async (id) => {
    try {
      await deleteProfile(id)
      setProfiles(profiles.filter((profile) => profile.id !== id))
      setIsDeleteDialogOpen(false)
      setEditingProfile(null)
      toast({
        title: "Profile Deleted",
        description: "The profile has been successfully deleted.",
        className: "bg-custom-accent border-custom-accent",
      })
    } catch (err) {
      console.error("Failed to delete profile:", err)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete profile. Please try again.",
      })
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-custom-primary">Admin Dashboard</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-custom-primary text-custom-background hover:bg-custom-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] bg-custom-background border-custom-secondary">
            <DialogHeader>
              <DialogTitle className="text-custom-primary">Add New Profile</DialogTitle>
              <DialogDescription>Fill in the details to create a new profile.</DialogDescription>
            </DialogHeader>
            <ProfileForm onSubmit={handleAddProfile} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-custom-primary" />
        <Input
          type="search"
          placeholder="Search profiles..."
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

      {isLoading ? (
        <div className="rounded-md border border-custom-secondary">
          <Table>
            <TableHeader className="bg-custom-primary/10">
              <TableRow>
                <TableHead className="text-custom-primary">Name</TableHead>
                <TableHead className="text-custom-primary">Title</TableHead>
                <TableHead className="text-custom-primary">Location</TableHead>
                <TableHead className="text-custom-primary">Status</TableHead>
                <TableHead className="text-right text-custom-primary">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-custom-background" : "bg-custom-accent/20"}>
                    <TableCell>
                      <Skeleton className="h-5 w-[150px] bg-custom-secondary" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-[120px] bg-custom-secondary" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-[140px] bg-custom-secondary" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-[80px] bg-custom-secondary" />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Skeleton className="h-8 w-8 rounded-md bg-custom-secondary" />
                        <Skeleton className="h-8 w-8 rounded-md bg-custom-secondary" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
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
        <div className="rounded-md border border-custom-secondary">
          <Table>
            <TableHeader className="bg-custom-primary/10">
              <TableRow>
                <TableHead className="text-custom-primary">Name</TableHead>
                <TableHead className="text-custom-primary">Title</TableHead>
                <TableHead className="text-custom-primary">Location</TableHead>
                <TableHead className="text-custom-primary">Status</TableHead>
                <TableHead className="text-right text-custom-primary">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProfiles.map((profile, index) => (
                <TableRow key={profile.id} className={index % 2 === 0 ? "bg-custom-background" : "bg-custom-accent/20"}>
                  <TableCell className="font-medium">{profile.name}</TableCell>
                  <TableCell>{profile.title}</TableCell>
                  <TableCell>{profile.location}</TableCell>
                  <TableCell>
                    <Badge
                      variant={profile.status === "Active" ? "outline" : "secondary"}
                      className={
                        profile.status === "Active"
                          ? "bg-custom-accent border-custom-accent text-foreground"
                          : "bg-custom-secondary border-custom-secondary text-foreground"
                      }
                    >
                      {profile.status || "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog
                        open={isEditDialogOpen && editingProfile?.id === profile.id}
                        onOpenChange={(open) => {
                          setIsEditDialogOpen(open)
                          if (!open) setEditingProfile(null)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-custom-primary text-custom-primary hover:bg-custom-primary hover:text-custom-background"
                            onClick={() => setEditingProfile(profile)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] bg-custom-background border-custom-secondary">
                          <DialogHeader>
                            <DialogTitle className="text-custom-primary">Edit Profile</DialogTitle>
                            <DialogDescription>Update the profile details.</DialogDescription>
                          </DialogHeader>
                          {editingProfile && <ProfileForm profile={editingProfile} onSubmit={handleUpdateProfile} />}
                        </DialogContent>
                      </Dialog>

                      <Dialog
                        open={isDeleteDialogOpen && editingProfile?.id === profile.id}
                        onOpenChange={(open) => {
                          setIsDeleteDialogOpen(open)
                          if (!open) setEditingProfile(null)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => setEditingProfile(profile)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-custom-background border-custom-secondary">
                          <DialogHeader>
                            <DialogTitle className="text-custom-primary">Delete Profile</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this profile? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsDeleteDialogOpen(false)}
                              className="border-custom-primary text-custom-primary hover:bg-custom-primary hover:text-custom-background"
                            >
                              Cancel
                            </Button>
                            <Button variant="destructive" onClick={() => handleDeleteProfile(profile.id)}>
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

