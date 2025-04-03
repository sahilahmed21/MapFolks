// MapComponent.js
"use client"

import { useState, useEffect, useCallback } from "react"
import { GoogleMap, Marker } from "@react-google-maps/api"
import { AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { loadGoogleMaps } from "@/lib/googleMapsLoader" // Import the loader

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "0.375rem",
  overflow: "hidden",
}

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
}

export default function MapComponent({ address }) {
  const [isGeocoding, setIsGeocoding] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [error, setError] = useState(null)
  const [center, setCenter] = useState(null)
  const [geocodingFailed, setGeocodingFailed] = useState(false)
  const [mapsApi, setMapsApi] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_Maps_API_KEY
    if (apiKey) {
      loadGoogleMaps(apiKey)
        .then((googleMaps) => {
          setMapsApi(googleMaps)
        })
        .catch((err) => {
          console.error("Error loading Google Maps:", err)
          setError("Failed to load Google Maps.")
        })
    } else {
      console.error("Google Maps API key is missing.")
      setError("Google Maps API key is missing.")
    }
  }, [])

  const geocodeAddress = useCallback(
    async (addressToGeocode) => {
      if (!mapsApi) return // Ensure mapsApi is loaded

      setIsGeocoding(true)
      setGeocodingFailed(false)
      setError(null)
      setLoadingProgress(0)

      let intervalId
      try {
        intervalId = setInterval(() => {
          setLoadingProgress((prev) => Math.min(prev + Math.random() * 20, 95))
        }, 300)

        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            addressToGeocode
          )}&key=${process.env.NEXT_PUBLIC_Maps_API_KEY}`
        )
        const data = await response.json()

        clearInterval(intervalId)

        if (data.status === "OK" && data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location
          setCenter({ lat, lng })
          setLoadingProgress(100)
          setError(null)
        } else {
          throw new Error("Could not find the location")
        }
      } catch (err) {
        clearInterval(intervalId)
        console.error("Geocoding error:", err.message)
        setError(err.message)
        setCenter(defaultCenter)
        setGeocodingFailed(true)
        toast({
          variant: "warning",
          title: "Map Location Issue",
          description: err.message,
        })
      } finally {
        setIsGeocoding(false)
      }
    },
    [toast, mapsApi]
  )

  useEffect(() => {
    geocodeAddress(address)
  }, [address, geocodeAddress])

  if (isGeocoding) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] bg-custom-background rounded-md p-6 border border-custom-secondary">
        <div className="w-full max-w-md space-y-4">
          <h3 className="text-custom-primary text-center font-medium">Loading map data...</h3>
          <Progress value={loadingProgress} className="h-2 bg-custom-secondary [&>*]:bg-custom-primary" />
          <p className="text-sm text-center text-muted-foreground">Locating {address || "default location"}</p>
        </div>
      </div>
    )
  }

  if (error && geocodingFailed) {
    return (
      <Alert variant="destructive" className="bg-custom-background border-custom-secondary h-[300px] flex flex-col justify-center">
        <AlertCircle className="h-4 w-4 text-custom-primary" />
        <AlertTitle className="text-custom-primary">Map Error</AlertTitle>
        <AlertDescription className="text-muted-foreground">{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="relative">
      {center && mapsApi && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          options={{
            disableDefaultUI: false,
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker position={center} />
        </GoogleMap>
      )}
    </div>
  )
}