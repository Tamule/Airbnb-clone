
"use client";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useCountries } from "../lib/getCountries";
import { icon } from "leaflet";
import { useEffect, useMemo, useState } from "react";

const ICON = icon({
  iconUrl:
    "https://images.vexels.com/media/users/3/131261/isolated/preview/b2e48580147ca0ed3f970f30bf8bb009-karten-standortmarkierung.png",
  iconSize: [50, 50],
});

const SA_CENTER: [number, number] = [-29, 24];
const SA_BOUNDS: [[number, number], [number, number]] = [
  [-35.0, 16.0],
  [-22.0, 33.0],
];
const DEFAULT_ZOOM = 5;
const SELECT_ZOOM = 7;

function RecenterOnChange({ center, zoom }: { center?: [number, number]; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, zoom ?? SELECT_ZOOM, { duration: 0.6 });
  }, [center, zoom, map]);
  return null;
}

function ClickToMark({ onPick }: { onPick?: (p: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      const p: [number, number] = [e.latlng.lat, e.latlng.lng];
      onPick?.(p);
    },
  });
  return null;
}

export default function Map({
  locationValue,
  onPick,
}: {
  locationValue: string;
  onPick?: (p: [number, number]) => void;
}) {
  const { getCountryByValue, getAllCountries } = useCountries();

  
  const entry =
    getCountryByValue(locationValue) ||
    getAllCountries().find(
      (i) => i.label.toLowerCase() === (locationValue || "").toLowerCase()
    );

  const provinceCenter = entry?.latLang as [number, number] | undefined;

  const [pin, setPin] = useState<[number, number] | null>(null);
  const pos = pin ?? provinceCenter; 

  const initialCenter = useMemo<[number, number]>(
    () => provinceCenter ?? SA_CENTER,
    [provinceCenter]
  );
  const initialZoom = useMemo(
    () => (provinceCenter ? SELECT_ZOOM : DEFAULT_ZOOM),
    [provinceCenter]
  );

  return (
    <MapContainer
      scrollWheelZoom={false}
      className="h-[50vh] rounded-lg relative z-0"
      center={initialCenter}
      zoom={initialZoom}
      maxBounds={SA_BOUNDS}
      maxBoundsViscosity={1.0}
      minZoom={4}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <RecenterOnChange center={provinceCenter} zoom={SELECT_ZOOM} />

      <ClickToMark
        onPick={(p) => {
          setPin(p);
          onPick?.(p);
        }}
      />

     
      {pos && <Marker position={pos} icon={ICON} />}
    </MapContainer>
  );
}
