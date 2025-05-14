import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const MapComponent = ({ location }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null); // To keep track of the map instance

  useEffect(() => {
    // Only initialize the map if the location is valid
    if (location && location.lat && location.lng) {
      // Remove previous map instance if it exists to avoid reuse issues
      if (mapInstance.current) {
        mapInstance.current.remove();
      }

      console.log('Initializing map with coordinates:', location);

      // Initialize the map
      mapInstance.current = L.map(mapContainer.current, {
        center: [location.lat, location.lng], // Set initial map center
        zoom: 13, // Set zoom level
        scrollWheelZoom: true, // Enable scroll zoom
      });

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance.current);

      // Create a custom marker using an emoji
      const emojiIcon = L.divIcon({
        className: 'leaflet-emoji-icon', // Optional: to apply custom styles
        html: '<span style="font-size: 24px;">📍</span>', // Emoji as marker
        iconSize: [32, 32],  // Adjust size as needed
        iconAnchor: [16, 32], // Anchor point for the marker
        popupAnchor: [0, -32] // Adjust popup position
      });

      // Create a marker for the location with the emoji icon
      L.marker([location.lat, location.lng], { icon: emojiIcon })
        .addTo(mapInstance.current)
        .bindPopup(`
          <b>${location.address}</b><br/>
          Latitude: ${location.lat}<br/>
          Longitude: ${location.lng}
        `)
        .openPopup();

      console.log('Map initialized successfully');
    } else {
      console.error('Invalid location data', location); // Log error if location data is invalid
    }

    // Cleanup the map instance when component unmounts or location changes
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove(); // Properly clean up map
        mapInstance.current = null; // Nullify the reference
      }
    };
  }, [location]); // Re-run the effect if location changes

  return (
    <div className="w-full h-full">
      <div ref={mapContainer} className="w-full h-96 rounded-lg"></div>
    </div>
  );
};

export default MapComponent;
