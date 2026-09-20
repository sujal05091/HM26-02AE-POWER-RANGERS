import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { NeuCard } from './NeumorphicUI';

export const MapViewer = ({ complaints = [], onSelectComplaint, activeWard = null }) => {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!leafletMap.current) {
      // Initialize Leaflet Map centered at Mysuru (Agrahara / Ward 42)
      leafletMap.current = L.map(mapRef.current, {
        center: [12.3051, 76.6551],
        zoom: 13,
        zoomControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(leafletMap.current);

      L.control.zoom({ position: 'bottomright' }).addTo(leafletMap.current);
    }

    const map = leafletMap.current;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polygon) {
        map.removeLayer(layer);
      }
    });

    // Draw Mock Ward Boundary Polygons
    const ward42Poly = L.polygon([
      [12.2980, 76.6480],
      [12.3120, 76.6480],
      [12.3120, 76.6620],
      [12.2980, 76.6620]
    ], {
      color: '#2563eb',
      weight: 2,
      fillColor: '#2563eb',
      fillOpacity: 0.1
    }).addTo(map);

    ward42Poly.bindTooltip("Ward 42 — Devaraja / Agrahara (MCC Zone 4)", { permanent: false });

    // Draw Complaint Markers
    complaints.forEach((c) => {
      if (c.latitude && c.longitude) {
        const markerColor = c.status === 'Resolved' ? '#16a34a' : c.status === 'Escalated' ? '#dc2626' : '#2563eb';
        
        const customIcon = L.divIcon({
          className: 'custom-leaflet-pin',
          html: `<div style="background-color: ${markerColor}; width: 16px; height: 16px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 0 10px ${markerColor}; cursor: pointer;"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });

        const marker = L.marker([c.latitude, c.longitude], { icon: customIcon }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: Inter, sans-serif;">
            <strong style="color: #1e293b; font-size: 13px;">${c.category} (#${c.id})</strong><br/>
            <span style="color: #64748b; font-size: 11px;">${c.address}</span><br/>
            <span style="color: #2563eb; font-weight: bold; font-size: 11px;">Status: ${c.status}</span>
          </div>
        `);

        marker.on('click', () => {
          if (onSelectComplaint) onSelectComplaint(c.id);
        });
      }
    });

  }, [complaints]);

  return (
    <NeuCard className="map-viewer-card" style={{ padding: '0.75rem', position: 'relative' }}>
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '340px',
          borderRadius: '12px',
          boxShadow: 'inset 3px 3px 6px #c3cee0, inset -3px -3px 6px #ffffff'
        }}
      />
    </NeuCard>
  );
};
