import { useEffect, useRef, useState } from "react";

export type GeoStatus = "idle" | "locating" | "ready" | "error";

export interface GeoPoint {
  lat: number;
  lng: number;
  accuracy?: number;
}

interface Options {
  onUpdate?: (pos: GeoPoint) => void;
}

export function useGeolocation(options: Options = {}) {
  const [status, setStatus] = useState<GeoStatus>("idle");
  const [position, setPosition] = useState<GeoPoint | null>(null);
  const [error, setError] = useState<string | null>(null);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported");
      setStatus("error");
      return;
    }
    setStatus("locating");
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const next: GeoPoint = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        };
        setPosition(next);
        setStatus("ready");
        setError(null);
        options.onUpdate?.(next);
      },
      (err) => {
        setError(err.message);
        setStatus("error");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      }
    );
    return () => {
      if (watchIdRef.current != null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [options]);

  return { status, position, error };
}
