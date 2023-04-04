import { useMap, LayersControl, LayerGroup } from "react-leaflet";
// import { useEffect } from "react";

export default function Routes({ routes }) {
  return (
    <LayersControl position="topright">
      {routes &&
        routes.map((r) => {
          return (
            <LayersControl.Overlay
              name={`${r.route_id} ${r.route_long_name}`}
              key={r.route_id}
            >
              <LayerGroup></LayerGroup>
            </LayersControl.Overlay>
          );
        })}
    </LayersControl>
  );
}
