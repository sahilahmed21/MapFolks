"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, Briefcase, GraduationCap, AlertCircle } from "lucide-react"
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import MapComponent from "@/components/map-component"
import { getProfileById } from "@/lib/api"
import { LoadScript } from "@react-google-maps/api"

interface Profile {
  avatar: string
  name: string
  title: string
  location: string
  email: string
  phone: string
  description: string
  experience?: { title: string; company: string; period: string }[]
  interests: string[]
}

const Maps_API_KEY = process.env.NEXT_PUBLIC_Maps_API_KEY;

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const { toast } = useToast()
  const [isMapsApiReady, setIsMapsApiReady] = useState(false);
  const [mapsApiError, setMapsApiError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true)
        const data = await getProfileById(params.id)
        setProfile(data)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch profile:", err)
        setError("Failed to load profile. Please try again.")
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profile. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [params.id, toast])

  // Get initials for avatar fallback
  const getInitials = (name: string | undefined | null) => {
    if (!name) return "U"
    return name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase() ?? "U";
  }

  const handleMapsLoad = () => {
    setIsMapsApiReady(true);
  };

  const handleMapsError = (e: any) => {
    console.error("Google Maps Script Load Error:", e);
    setMapsApiError("Failed to load Google Maps.");
    toast({ variant: "destructive", title: "Map Error", description: "Failed to load Google Maps." });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Skeleton className="h-9 w-24 bg-custom-secondary" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card className="border-custom-secondary">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Skeleton className="h-32 w-32 rounded-full mb-4 bg-custom-secondary" />
                  <Skeleton className="h-6 w-40 mb-2 bg-custom-secondary" />
                  <Skeleton className="h-4 w-32 mb-2 bg-custom-secondary" />
                  <Skeleton className="h-4 w-24 mb-4 bg-custom-secondary" />

                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Skeleton className="h-10 w-full bg-custom-secondary" />
                    <Skeleton className="h-10 w-full bg-custom-secondary" />
                  </div>
                </div>

                <Separator className="my-6 bg-custom-secondary" />

                <div>
                  <Skeleton className="h-5 w-40 mb-2 bg-custom-secondary" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-custom-secondary" />
                    <Skeleton className="h-4 w-full bg-custom-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <Card className="border-custom-secondary">
              <CardContent className="pt-6">
                <Skeleton className="h-6 w-32 mb-4 bg-custom-secondary" />
                <Skeleton className="h-4 w-full mb-2 bg-custom-secondary" />
                <Skeleton className="h-4 w-full mb-2 bg-custom-secondary" />
                <Skeleton className="h-4 w-2/3 bg-custom-secondary" />

                <Separator className="my-6 bg-custom-secondary" />

                <Skeleton className="h-6 w-40 mb-4 bg-custom-secondary" />
                <div className="space-y-4">
                  <div className="flex">
                    <Skeleton className="h-5 w-5 mr-3 bg-custom-secondary" />
                    <div className="w-full">
                      <Skeleton className="h-5 w-40 mb-1 bg-custom-secondary" />
                      <Skeleton className="h-4 w-32 bg-custom-secondary" />
                    </div>
                  </div>
                  <div className="flex">
                    <Skeleton className="h-5 w-5 mr-3 bg-custom-secondary" />
                    <div className="w-full">
                      <Skeleton className="h-5 w-40 mb-1 bg-custom-secondary" />
                      <Skeleton className="h-4 w-32 bg-custom-secondary" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-custom-secondary">
              <CardContent className="pt-6">
                <Skeleton className="h-6 w-32 mb-4 bg-custom-secondary" />
                <Skeleton className="h-[300px] w-full rounded-md bg-custom-secondary" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="text-custom-primary hover:bg-custom-accent/20 hover:text-custom-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to profiles
          </Button>
        </Link>

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
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="text-custom-primary hover:bg-custom-accent/20 hover:text-custom-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to profiles
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <CardContainer className="inter-var">
            <CardBody className=" relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-6 border">
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-4 border-4 border-custom-secondary">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="bg-custom-primary text-custom-background text-2xl">
                    {getInitials(profile.name)}
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold text-custom-primary">{profile.name}</h1>
                <p className="text-muted-foreground mb-2">{profile.title}</p>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  {profile.location}
                </div>

                <div className="grid grid-cols-2 gap-2 w-full">
                  <Button
                    variant="outline"
                    className="flex items-center justify-center border-custom-primary text-custom-primary hover:bg-custom-primary hover:text-custom-background"
                    onClick={() => window.open(`mailto:${profile.email}`)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center border-custom-primary text-custom-primary hover:bg-custom-primary hover:text-custom-background"
                    onClick={() => window.open(`tel:${profile.phone}`)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
              </div>

              <Separator className="my-6 bg-custom-secondary" />

              <div>
                <h2 className="font-semibold mb-2 text-custom-primary">Contact Information</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{profile.phone}</span>
                  </div>
                </div>
              </div>
            </CardBody>
          </CardContainer>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="border-custom-secondary">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4 text-custom-primary">About</h2>
              <p className="text-muted-foreground">{profile.description}</p>

              <Separator className="my-6 bg-custom-secondary" />

              <h2 className="text-xl font-semibold mb-4 text-custom-primary">Experience</h2>
              <div className="space-y-4">
                {profile.experience ? (
                  profile.experience.map((exp, index) => (
                    <div key={index} className="flex">
                      <Briefcase className="h-5 w-5 mr-3 text-custom-primary" />
                      <div>
                        <h3 className="font-medium">{exp.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {exp.company} • {exp.period}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex">
                      <Briefcase className="h-5 w-5 mr-3 text-custom-primary" />
                      <div>
                        <h3 className="font-medium">Senior Developer</h3>
                        <p className="text-sm text-muted-foreground">Acme Inc. • 2020 - Present</p>
                      </div>
                    </div>
                    <div className="flex">
                      <Briefcase className="h-5 w-5 mr-3 text-custom-primary" />
                      <div>
                        <h3 className="font-medium">Developer</h3>
                        <p className="text-sm text-muted-foreground">Tech Solutions • 2017 - 2020</p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <Separator className="my-6 bg-custom-secondary" />

              <h2 className="text-xl font-semibold mb-4 text-custom-primary">Education</h2>
              <div className="flex">
                <GraduationCap className="h-5 w-5 mr-3 text-custom-primary" />
                <div>
                  <h3 className="font-medium">Computer Science</h3>
                  <p className="text-sm text-muted-foreground">University of Technology • 2013 - 2017</p>
                </div>
              </div>

              <Separator className="my-6 bg-custom-secondary" />

              <h2 className="text-xl font-semibold mb-4 text-custom-primary">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-custom-accent border-custom-accent text-foreground"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-custom-secondary">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4 text-custom-primary">Location</h2>
              {Maps_API_KEY ? (
                <LoadScript
                  googleMapsApiKey={Maps_API_KEY}
                  loadingElement={<div style={{ height: '300px' }}><p>Loading Google Maps... (please refresh your page)</p></div>}
                  onLoad={handleMapsLoad}
                  onError={handleMapsError}
                >
                  {isMapsApiReady && profile?.location ? (
                    <MapComponent address={profile.location} />
                  ) : !mapsApiError ? (
                    <div style={{ height: '300px' }}>Map is loading...</div>
                  ) : (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Map Error</AlertTitle>
                      <AlertDescription>{mapsApiError}</AlertDescription>
                    </Alert>
                  )}
                </LoadScript>
              ) : (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Map Configuration Error</AlertTitle>
                  <AlertDescription>Google Maps API Key is missing.</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}