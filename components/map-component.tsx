// MapComponent.js
"use client"

import { useState, useEffect, useCallback } from "react"
import { GoogleMap, Marker } from "@react-google-maps/api"
import { AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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
  const { toast } = useToast()

  const geocodeAddress = useCallback(async (addressToGeocode) => {
    if (!addressToGeocode) {
      setError("No address provided to display on the map.")
      setIsGeocoding(false)
      setCenter(defaultCenter);
      setGeocodingFailed(true)
      return;
    }

    setIsGeocoding(true);
    setGeocodingFailed(false);
    setError(null);
    setLoadingProgress(0);

    let intervalId;
    try {
      intervalId = setInterval(() => {
        setLoadingProgress((prev) => Math.min(prev + Math.random() * 20, 95));
      }, 300)

      const Maps_API_KEY = process.env.NEXT_PUBLIC_Maps_API_KEY;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressToGeocode)}&key=${Maps_API_KEY}`
      );
      const data = await response.json();

      clearInterval(intervalId);

      if (data.status !== "OK" || !data.results || data.results.length === 0) {
        let errorMessage = "Could not find the location";
        switch (data.status) {
          case "ZERO_RESULTS":
            errorMessage = `No results found for "${addressToGeocode}". Displaying default location.`;
            break;
          case "OVER_QUERY_LIMIT":
            errorMessage = "Map quota exceeded. Please try again later.";
            break;
          case "REQUEST_DENIED":
            errorMessage = "Map request denied. Check API key and permissions.";
            break;
          case "INVALID_REQUEST":
            errorMessage = "Invalid map request (address might be malformed).";
            break;
          default:
            errorMessage = `Geocoding failed: ${data.status || 'Unknown error'}`;
        }
        throw new Error(errorMessage);
      }

      const { lat, lng } = data.results[0].geometry.location;
      setCenter({ lat, lng });
      setLoadingProgress(100);
      setError(null);

    } catch (err) {
      clearInterval(intervalId);
      console.error("Geocoding error:", err.message);
      setError(err.message);
      setCenter(defaultCenter);
      setGeocodingFailed(true);
      toast({
        variant: "warning",
        title: "Map Location Issue",
        description: err.message,
      });
    } finally {
      setIsGeocoding(false);
    }
  }, [toast]);

  useEffect(() => {
    geocodeAddress(address);
  }, [address, geocodeAddress]);

  if (isGeocoding) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] bg-custom-background rounded-md p-6 border border-custom-secondary">
        <div className="w-full max-w-md space-y-4">
          <h3 className="text-custom-primary text-center font-medium">Loading map data...</h3>
          <Progress value={loadingProgress} className="h-2 bg-custom-secondary [&>*]:bg-custom-primary" />
          <p className="text-sm text-center text-muted-foreground">Locating {address || "default location"}</p>
        </div>
      </div>
    );
  }

  const showGeneralError = error && geocodingFailed && !error.toLowerCase().includes('no results found');
  if (showGeneralError) {
    return (
      <Alert variant="destructive" className="bg-custom-background border-custom-secondary h-[300px] flex flex-col justify-center">
        <AlertCircle className="h-4 w-4 text-custom-primary" />
        <AlertTitle className="text-custom-primary">Map Error</AlertTitle>
        <AlertDescription className="text-muted-foreground">{error}</AlertDescription>
      </Alert>
    );
  }

  if (!center && !geocodingFailed) {
    return <div>Preparing map...</div>;
  }

  return (
    <div className="relative">
      {geocodingFailed && error && error.toLowerCase().includes('no results found') && (
        <Alert variant="warning" className="mb-2 bg-yellow-50 border-yellow-200 dark:bg-yellow-900/30 dark:border-yellow-700/50">
          <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <AlertTitle className="text-yellow-800 dark:text-yellow-300">Location Warning</AlertTitle>
          <AlertDescription className="text-yellow-700 dark:text-yellow-400/80">
            {error}. Showing default map location.
          </AlertDescription>
        </Alert>
      )}

      {center && (
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