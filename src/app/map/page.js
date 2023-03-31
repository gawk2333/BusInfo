"use client";
import styles from "./page.module.css";
import Stops from "@/components/Stops";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

export default function Map() {
  return (
    <MapContainer
      center={[-43.5321, 172.6362]}
      zoom={14}
      maxZoom={18}
      minZoom={10}
      className={styles.map}
      placeholder={<div>this is a placeholder</div>}
    >
      <Stops />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
