import React, { useEffect, useRef } from "react";
import L from "leaflet";
import { useTranslation } from "react-i18next";
import { getLocalizedValue } from "../lib/projectUtils";

const createIcon = (emoji) =>
  L.divIcon({
    className: "custom-emoji-marker",
    html: `<div class="emoji-marker">${emoji}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -28]
  });

export default function MapView({ projects, selectedId, onSelect }) {
  const { i18n } = useTranslation();
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      return undefined;
    }

    const map = L.map(mapRef.current, {
      center: [24.7136, 46.6753],
      zoom: 10,
      zoomControl: true
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    const bounds = [];

    projects.forEach((project) => {
      const marker = L.marker(project.location, {
        icon: createIcon(project.icon)
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: Arial, sans-serif; direction: ${
          i18n.language === "ar" ? "rtl" : "ltr"
        }; text-align: ${i18n.language === "ar" ? "right" : "left"}; min-width: 180px">
          <strong>${project.icon} ${getLocalizedValue(project.name, i18n.language, "")}</strong><br/>
          <span>${getLocalizedValue(project.status, i18n.language, "")}</span><br/>
          <small>${getLocalizedValue(project.progressLabel, i18n.language, "")}</small><br/>
          <span style="font-size:12px;color:#888">${getLocalizedValue(
            project.iconLabel,
            i18n.language,
            ""
          )}</span><br/>
          <span style="font-size:12px;color:#64748b">${getLocalizedValue(
            project.locationType,
            i18n.language,
            ""
          )}</span>
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
  }, [projects, selectedId, onSelect, i18n.language]);

  return <div ref={mapRef} className="map-box" />;
}
