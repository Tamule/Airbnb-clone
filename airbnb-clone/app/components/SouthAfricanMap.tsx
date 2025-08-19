

"use client";
import { useEffect, useMemo, useState } from "react";
import { geoMercator, geoPath, type GeoProjection } from "d3-geo";
import type { Feature as GJFeature, FeatureCollection, Geometry } from "geojson";

type ProvinceProps = { name?: string; NAME_1?: string; province?: string };
type Feature = GJFeature<Geometry, ProvinceProps>;
type FC = FeatureCollection<Geometry, ProvinceProps>;

export default function SouthAfricaMap({
  onSelect,
  width = 800,
  height = 600,
}: {
  onSelect?: (sel: { province: string }) => void;
  width?: number;
  height?: number;
}) {
  const [fc, setFc] = useState<FC | null>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    fetch("/geo/south-africa-provinces.json")
      .then((r) => r.json())
      .then(setFc)
      .catch((e) => console.error("Failed to load SA GeoJSON:", e));
  }, []);

  const { path, projection } = useMemo(() => {
    const proj: GeoProjection = geoMercator();
    const p = geoPath(proj);
    if (fc) {

      proj.fitSize([width, height], fc);
    }
    return { path: p, projection: proj };
  }, [fc, width, height]);

  const getName = (f: Feature) =>
    f.properties?.name ?? f.properties?.NAME_1 ?? f.properties?.province ?? "Unknown";

  if (!fc) return <div className="rounded-xl border p-4">Loading map…</div>;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto rounded-xl border shadow-sm">
      {fc.features.map((f, i) => {
        const name = getName(f as Feature);
        return (
          <path
            key={i}
            d={path(f as any) || ""}
            onClick={() => {
              setActive(name);
              onSelect?.({ province: name });
            }}
            style={{ cursor: "pointer" }}
            fill={active === name ? "#9ecae1" : "#cfe8ff"}
            stroke="#5a78a0"
            strokeWidth={0.5}
          />
        );
      })}
    </svg>
  );
}
