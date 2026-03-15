"use client";

import { useEffect, useRef } from "react";
import type { Space } from "@/data/spaces";
import type { Map as LMap, Marker } from "leaflet";

interface Props {
  spaces: Space[];
  activeId: string | null;
  onMarkerClick: (id: string) => void;
}

function makePinHtml(space: Space, active: boolean) {
  const bg = active ? "#09090F" : "#E8622A";
  const scale = active ? "scale(1.18)" : "scale(1)";
  return `<div style="
    background:${bg};
    color:white;
    padding:4px 10px;
    border-radius:20px;
    font-size:11px;
    font-weight:700;
    font-family:'Bricolage Grotesque',sans-serif;
    white-space:nowrap;
    cursor:pointer;
    box-shadow:0 2px 12px rgba(0,0,0,0.35);
    transition:all 0.18s ease;
    transform:${scale};
    transform-origin:bottom center;
    border:2px solid rgba(255,255,255,0.25);
    user-select:none;
  ">£${space.priceFrom.toLocaleString()}</div>`;
}

export default function SpaceMap({ spaces, activeId, onMarkerClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());

  // Bootstrap map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Load CSS first
    const cssId = "leaflet-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    let map: LMap;

    import("leaflet").then(L => {
      if (!containerRef.current || mapRef.current) return;

      // Fix webpack icon path issue
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      map = L.map(containerRef.current, {
        center: [51.505, -0.09],
        zoom: 11,
        zoomControl: false,
        attributionControl: false,
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.control.attribution({ position: "bottomleft", prefix: false })
        .addAttribution("© <a href='https://carto.com'>CARTO</a> © <a href='https://openstreetmap.org'>OSM</a>")
        .addTo(map);

      // CartoDB Positron — clean light tiles that match the cream palette
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;

      // Add price-bubble markers
      spaces.forEach(space => {
        const icon = L.divIcon({
          html: makePinHtml(space, false),
          className: "",
          iconAnchor: [30, 16],
        });

        const marker = L.marker([space.lat, space.lng], { icon }).addTo(map);

        marker.bindPopup(
          `<div style="font-family:'Bricolage Grotesque',sans-serif;padding:2px 0;min-width:160px">
            <div style="font-weight:600;color:#09090F;font-size:13px;margin-bottom:2px">${space.name}</div>
            <div style="color:#E8622A;font-size:11px;margin-bottom:6px">${space.neighbourhood}, ${space.postcode}</div>
            <div style="font-size:11px;color:#666">From £${space.priceFrom.toLocaleString()}/${space.priceUnit}</div>
            <a href="/spaces/${space.slug}" style="display:inline-flex;align-items:center;gap:4px;margin-top:8px;font-size:11px;font-weight:600;color:#E8622A;text-decoration:none">
              View space →
            </a>
          </div>`,
          { closeButton: false, maxWidth: 200 }
        );

        marker.on("click", () => onMarkerClick(space.id));
        markersRef.current.set(space.id, marker);
      });

      // Fit all pins
      if (spaces.length > 0) {
        const bounds = L.latLngBounds(spaces.map(s => [s.lat, s.lng]));
        map.fitBounds(bounds, { padding: [48, 48], maxZoom: 13 });
      }
    });

    return () => {
      map?.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update pin colours when activeId changes — no map rebuild needed
  useEffect(() => {
    import("leaflet").then(L => {
      markersRef.current.forEach((marker, id) => {
        const space = spaces.find(s => s.id === id);
        if (!space) return;
        const newIcon = L.divIcon({
          html: makePinHtml(space, id === activeId),
          className: "",
          iconAnchor: [30, 16],
        });
        marker.setIcon(newIcon);
        if (id === activeId) {
          marker.openPopup();
          mapRef.current?.panTo(marker.getLatLng(), { animate: true, duration: 0.4 });
        }
      });
    });
  }, [activeId, spaces]);

  return <div ref={containerRef} className="w-full h-full" />;
}
