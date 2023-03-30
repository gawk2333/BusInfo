"use client";
import styles from "./page.module.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";

export default function Map() {
  const mapRef = useRef(null);
  return (
    <MapContainer
      ref={mapRef}
      center={[-43.5321, 172.6362]}
      zoom={5}
      maxZoom={19}
      minZoom={3}
      className={styles.map}
      placeholder={<div>this is a placeholder</div>}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
