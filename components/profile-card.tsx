"use client";

import Link from "next/link";
import { MapPin, Mail, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import MapComponent from "@/components/map-component"; // Assuming this path is correct
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"; // Assuming this path is correct

export default function ProfileCard({ profile }) {
  // Get initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Choose a fixed height that works for your design, e.g., h-80, h-96
  // You might need to adjust this value based on your content and layout preference.
  const cardFixedHeight = "h-96"; // Example: 24rem or 384px

  return (
    <div className="w-full">
      <CardContainer className="inter-var">
        {/* --- MODIFICATION START --- */}
        <CardBody
          className={`bg-custom-background relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full ${cardFixedHeight} rounded-xl p-6 border border-custom-secondary flex flex-col`} // Added fixed height and flex properties
        >
          {/* --- MODIFICATION END --- */}

          {/* Top Section: Avatar, Name, Title, Status */}
          <CardItem translateZ="50" className="mb-4">
            <div className="flex justify-between items-start">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar className="h-20 w-20 border border-custom-secondary">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback className="bg-custom-primary text-custom-background">
                        {getInitials(profile.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-neutral-600 dark:text-white truncate " > {/* Added truncate for safety */}
                        {profile.name}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-300 truncate"> {/* Added truncate for safety */}
                        {profile.title}
                      </p>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-64 p-6 bg-custom-accent border-custom-secondary">
                  {/* ... HoverCard content remains the same ... */}
                  <div className="flex justify-between ">
                    <Avatar className="h-20 w-20 border border-custom-secondary">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback className="bg-custom-primary text-custom-background">
                        {getInitials(profile.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-custom-primary">{profile.name}</h4>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Mail className="h-3 w-3 mr-1" />
                        {profile.email}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Phone className="h-3 w-3 mr-1" />
                        {profile.phone}
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <CardItem translateZ="40">
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
              </CardItem>
            </div>
          </CardItem>

          {/* Middle Section: Location, Description */}
          {/* --- MODIFICATION START --- */}
          {/* Added flex-grow to make this section fill available vertical space */}
          <CardItem translateZ="60" as="div" className="mt-4 flex-grow overflow-hidden">
            {/* Added overflow-hidden in case content is extremely long */}
            {/* --- MODIFICATION END --- */}
            <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-300 mb-3"> {/* Added mb-3 */}
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{profile.location}</span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-300 line-clamp-3"> {/* line-clamp remains useful */}
              {profile.description}
            </p>
          </CardItem>

          {/* Bottom Section: Buttons */}
          {/* --- MODIFICATION START --- */}
          {/* Added mt-auto to push this section to the bottom, pt-4 for spacing above */}
          <div className="flex justify-between items-center mt-auto pt-4">
            {/* --- MODIFICATION END --- */}
            <CardItem translateZ="20" translateX={-10}>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="px-4 py-2 rounded-xl text-xs font-normal border-custom-primary text-custom-primary hover:bg-custom-primary hover:text-custom-background"
                  >
                    Summary {/* Consider changing this text if it opens a map? */}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[400px] p-0 bg-custom-background border-custom-secondary">
                  <DialogHeader className="p-4 pb-2"> {/* Adjusted padding */}
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-custom-primary">{profile.name} - Location</DialogTitle>
                      <DialogClose className="h-6 w-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                      </DialogClose>
                    </div>
                    <DialogDescription>{profile.location}</DialogDescription>
                  </DialogHeader>
                  <div className="p-4 pt-0">
                    {/* Ensure MapComponent handles potential loading/errors gracefully */}
                    <MapComponent address={profile.location} />
                  </div>
                </DialogContent>
              </Dialog>
            </CardItem>
            <CardItem translateZ="20" translateX={10}>
              <Button
                asChild
                className="px-4 py-2 rounded-xl bg-custom-primary text-custom-background text-xs font-bold hover:bg-custom-primary/90"
              >
                <Link href={`/profiles/${profile.id}`}>View Profile</Link>
              </Button>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}

// ProfilesGrid component (No changes needed here likely)
export function ProfilesGrid({ profiles }) {
  return (
    // The gap-8 should now work correctly as cards have fixed height
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
}