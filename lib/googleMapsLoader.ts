// lib/googleMapsLoader.js
let googleMapsPromise: Promise<google.maps.Map>;
let isApiLoaded = false;

export const loadGoogleMaps = (apiKey: string): Promise<google.maps.Map> => {
    if (isApiLoaded && googleMapsPromise) {
        return googleMapsPromise;
    }

    googleMapsPromise = new Promise((resolve, reject) => {
        if (typeof window === 'undefined') {
            reject(new Error('Google Maps API cannot be loaded on the server.'));
            return;
        }
        if (window.google && window.google.maps) {
            isApiLoaded = true;
            resolve(window.google.maps);
            return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            isApiLoaded = true;
            resolve(window.google.maps);
        };
        script.onerror = () => {
            reject(new Error('Failed to load Google Maps API.'));
        };
        document.head.appendChild(script);
    });

    return googleMapsPromise;
};