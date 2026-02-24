"use client";

import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { SITE_CONFIG } from '@/app/config';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

// IMPORTANT: Add your Google Maps API key to your .env.local file
// NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_API_KEY"

export function MapComponent() {
  const position = SITE_CONFIG.site.location.coordinates;
  const [apiKey, setApiKey] = useState<string | undefined>(undefined);

  useEffect(() => {
    // This is a client component, so we can safely access process.env here.
    // We do this in useEffect to avoid hydration mismatches.
    setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  }, []);

  if (!apiKey) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
        <p>Google Maps API Key is missing. Please add it to your .env.local file.</p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={position}
        defaultZoom={15}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={'al-rashoud-map'}
        className={cn('w-full', 'h-full')}
      >
        <Marker position={position} />
      </Map>
    </APIProvider>
  );
}
