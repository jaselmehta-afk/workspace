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
  return `<div style="
    background:${active ? "#ffffff" : "#E8622A"};
    color:${active ? "#09090F" : "#ffffff"};
    padding:5px 11px;
    border-radius:24px;
    font-size:12px;
    font-weight:700;
    font-family:'Bricolage Grotesque',Inter,sans-serif;
    white-space:nowrap;
    cursor:pointer;
    box-shadow:${active ? "0 0 0 3px rgba(232,98,42,0.5), 0 4px 20px rgba(0,0,0,0.5)" : "0 2px 16px rgba(0,0,0,0.55)"};
    transition:all 0.18s cubic-bezier(0.22,1,0.36,1);
    transform:${active ? "scale(1.22) translateY(-2px)" : "scale(1)"};
    transform-origin:bottom center;
    user-select:none;
    letter-spacing:-0.01em;
  ">£${space.priceFrom.toLocaleString()}</div>`;
}

export default function SpaceMap({ spaces, activeId, onMarkerClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const cssId = "leaflet-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    let map: LMap;

    import("leaflet").then((L) => {
      if (!containerRef.current || mapRef.current) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      map = L.map(containerRef.current, {
        center: [51.505, -0.09],
        zoom: 11,
        zoomControl: false,
        attributionControl: false,
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);
      L.control
        .attribution({ position: "bottomleft", prefix: false })
        .addAttribution(
          "© <a href='https://carto.com'>CARTO</a> © <a href='https://openstreetmap.org'>OSM</a>"
        )
        .addTo(map);

      // CARTO Voyager — modern, warm, sharp labels, good contrast at all zoom levels
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        { subdomains: "abcd", maxZoom: 19 }
      ).addTo(map);

      mapRef.current = map;

      spaces.forEach((space) => {
        const icon = L.divIcon({
          html: makePinHtml(space, false),
          className: "",
          iconAnchor: [32, 16],
        });

        const marker = L.marker([space.lat, space.lng], { icon }).addTo(map);

        marker.bindPopup(
          `<div style="
            font-family:'Bricolage Grotesque',Inter,sans-serif;
            background:#ffffff;
            border-radius:16px;
            padding:14px 16px;
            min-width:180px;
            border:1px solid rgba(0,0,0,0.08);
            box-shadow:0 4px 24px rgba(0,0,0,0.12);
          ">
            <div style="font-weight:600;color:#09090F;font-size:13px;margin-bottom:3px;line-height:1.3">${space.name}</div>
            <div style="color:#E8622A;font-size:11px;font-weight:600;margin-bottom:8px;letter-spacing:0.02em">${space.neighbourhood} · ${space.postcode}</div>
            <div style="font-size:11px;color:#6b7280;margin-bottom:10px">From £${space.priceFrom.toLocaleString()}/${space.priceUnit}</div>
            <a href="/spaces/${space.slug}" style="
              display:inline-flex;align-items:center;gap:5px;
              font-size:11px;font-weight:700;color:#ffffff;
              background:#E8622A;
              padding:5px 12px;border-radius:20px;
              text-decoration:none;
            ">View space →</a>
          </div>`,
          {
            closeButton: false,
            maxWidth: 220,
            className: "ws-map-popup",
          }
        );

        marker.on("click", () => onMarkerClick(space.id));
        markersRef.current.set(space.id, marker);
      });

      if (spaces.length > 0) {
        const bounds = L.latLngBounds(spaces.map((s) => [s.lat, s.lng]));
        map.fitBounds(bounds, { padding: [56, 56], maxZoom: 13 });
      }
    });

    return () => {
      map?.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    import("leaflet").then((L) => {
      markersRef.current.forEach((marker, id) => {
        const space = spaces.find((s) => s.id === id);
        if (!space) return;
        const newIcon = L.divIcon({
          html: makePinHtml(space, id === activeId),
          className: "",
          iconAnchor: [32, 16],
        });
        marker.setIcon(newIcon);
        if (id === activeId) {
          marker.openPopup();
          mapRef.current?.panTo(marker.getLatLng(), { animate: true, duration: 0.35 });
        }
      });
    });
  }, [activeId, spaces]);

  return (
    <>
      <style>{`
        .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
          border-radius: 0 !important;
        }
        .leaflet-popup-content { margin: 0 !important; }
        .leaflet-popup-tip-container { display: none !important; }
        .leaflet-control-attribution {
          background: rgba(255,255,255,0.85) !important;
          backdrop-filter: blur(8px);
          color: rgba(9,9,15,0.4) !important;
          font-size: 10px !important;
          border-radius: 8px 0 0 0;
          padding: 3px 8px !important;
        }
        .leaflet-control-attribution a { color: #E8622A !important; }
        .leaflet-control-zoom {
          border: none !important;
          border-radius: 12px !important;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0,0,0,0.15) !important;
        }
        .leaflet-control-zoom a {
          background: #ffffff !important;
          color: #09090F !important;
          border: 1px solid rgba(0,0,0,0.08) !important;
          font-size: 16px !important;
          width: 36px !important;
          height: 36px !important;
          line-height: 36px !important;
        }
        .leaflet-control-zoom a:hover {
          background: #f5f5f5 !important;
          color: #E8622A !important;
        }
      `}</style>
      <div ref={containerRef} className="w-full h-full" />
    </>
  );
}
