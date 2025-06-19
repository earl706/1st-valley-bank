import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { faL } from "@fortawesome/free-solid-svg-icons";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZWFybDcwNiIsImEiOiJjbTk1a3Q2dm0xMW9pMm5zZm5kb2EwcXR4In0.aoOboZNNC-ib2-1o2BAOCg";

export default function ContactPageMap({ lat, lon }) {
  const mapContainer = useRef(null);
  useEffect(() => {
    const initMap = async () => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/standard",
        config: {
          basemap: {
            lightPreset: "day",
            showPointOfInterestLabels: false,
          },
        },
        center: [lon, lat],
        zoom: 18,
        pitch: 60,
        bearing: -20,
        antialias: true,
      });

      // Set marker options.
      const marker = new mapboxgl.Marker({
        color: "#396131",
        draggable: false,
      })
        .setLngLat([lon, lat])
        .addTo(map);
    };

    initMap();
  }, []);

  return (
    <div>
      <div ref={mapContainer} style={{ height: "600px", width: "100%" }} />
    </div>
  );
}
