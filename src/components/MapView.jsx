import React, { useEffect } from "react";
import L from "leaflet";

const createIcon = (emoji) =>
  L.divIcon({
    className: "custom-emoji-marker",
    html: `<div class="emoji-marker">${emoji}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -28]
  });

export default function MapView({ projects, selectedId, onSelect }) {
  useEffect(() => {
    const map = L.map("map", {
      center: [24.7136, 46.6753],
      zoom: 10,
      zoomControl: true
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    const bounds = [];

    projects.forEach((project) => {
      const marker = L.marker(project.location, {
        icon: createIcon(project.icon)
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: Arial; direction: rtl; text-align: right; min-width: 180px">
          <strong>${project.name}</strong><br/>
          <span>${project.status}</span><br/>
          <small>${project.progressLabel}</small>
        </div>
      `);

      marker.on("click", () => onSelect(project.id));
      bounds.push(project.location);

      if (selectedId === project.id) {
        marker.openPopup();
      }
    });

    if (bounds.length) {
      map.fitBounds(bounds, { padding: [30, 30] });
    }

    return () => map.remove();
  }, [projects, selectedId, onSelect]);

  return <div id="map" className="map-box" />;
}