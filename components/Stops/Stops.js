"use client";
import L from "leaflet";
// import { getAllStops } from "@/app/api/stopsAPI";
// import stops from "@/data/stops";
import { Marker, useMapEvents, Popup } from "react-leaflet";
import { useState } from "react";

export default function Stops({ stops }) {
  const [zoom, setZoom] = useState(14);
  // const [stops, setStops] = useState(null);

  // const fetchAllStops = useCallback(async () => {
  //   const result = await getAllStops();
  //   if (!result.error && result) {
  //     setStops(result);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchAllStops();
  // }, [fetchAllStops]);

  const getIcon = () => {
    if (zoom > 12 && zoom < 15) {
      return L.icon({
        iconUrl: "/busstop.svg",
        iconSize: [8, 8],
        iconAnchor: [4, 4],
        popupAnchor: [0, -4],
      });
    }
    if (zoom >= 15 && zoom < 17) {
      return L.icon({
        iconUrl: "/busstop.svg",
        iconSize: [12, 12],
        iconAnchor: [6, 6],
        popupAnchor: [0, -6],
      });
    }
    if (zoom >= 17 && zoom < 19) {
      return L.icon({
        iconUrl: "/busstop.svg",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12],
      });
    }
  };
  const map = useMapEvents({
    zoomend: () => {
      const currentZoom = map.getZoom();
      setZoom(currentZoom);
    },
  });
  return stops && zoom > 12 ? (
    stops.map((r) => {
      return (
        <Marker
          icon={getIcon()}
          key={r.stop_id}
          position={[r.stop_lat, r.stop_lon]}
        >
          <Popup minWidth={180}>
            <h4>StopInfo</h4>
            <ul>
              <li>{r.stop_code}</li>
              <li>{r.stop_name}</li>
            </ul>
          </Popup>
        </Marker>
      );
    })
  ) : (
    <></>
  );
}
