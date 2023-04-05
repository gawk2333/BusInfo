import {
  LayersControl,
  LayerGroup,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import { useEffect, useState, useCallback } from "react";
import _ from "lodash";

export default function Routes({ routes }) {
  const [selectedLayer, setSelectedLayer] = useState([]);
  const [fetchedTrips, setFetchedTrips] = useState({});
  // const [route]

  useMapEvents({
    overlayadd: (event) => {
      // The name of the layer that was selected
      const selectedLayerArr = _.cloneDeep(selectedLayer);
      const selectedLayerName = event.name;
      const selectedLayerId = selectedLayerName.split(" ")[0];
      selectedLayerArr.push(selectedLayerId);
      setSelectedLayer(selectedLayerArr);
    },
    overlayremove: (event) => {
      const selectedLayerArr = _.cloneDeep(selectedLayer);
      const selectedLayerName = event.name;
      const selectedLayerId = selectedLayerName.split(" ")[0];
      const filteredLayerArr = selectedLayerArr.filter(
        (layer) => layer !== selectedLayerId
      );
      setSelectedLayer(filteredLayerArr);
    },
  });

  const checkIfTripNeedToFetch = useCallback(() => {
    const fetchedLayers = Object.keys(fetchedTrips);
    const allIncluded = selectedLayer.some(
      (item) => !fetchedLayers.includes(item)
    );
    return allIncluded;
  }, [fetchedTrips, selectedLayer]);

  const fetchLayer = useCallback(
    async (layerId) => {
      fetch(`api/trips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          routeId: layerId,
        }),
      })
        .then((res) => res.json())
        .then(({ error, data, message }) => {
          if (!error) {
            const fetchedTripsCopy = _.cloneDeep(fetchedTrips);
            fetchedTripsCopy[layerId] = data;
            setFetchedTrips(fetchedTripsCopy);
          } else {
            console.log(message);
          }
        });
    },
    [fetchedTrips]
  );

  const fetchTripsLayer = useCallback(() => {
    const needToFetch = checkIfTripNeedToFetch();
    if (needToFetch) {
      // Fetch the data for the selected layer using the layer name
      const fetchedLayers = Object.keys(fetchedTrips);
      const [layerToFetch] = _.difference(selectedLayer, fetchedLayers);
      if (layerToFetch) {
        fetchLayer(layerToFetch);
      }
    }
  }, [checkIfTripNeedToFetch, fetchLayer, fetchedTrips, selectedLayer]);

  useEffect(() => {
    fetchTripsLayer();
  }, [fetchTripsLayer, selectedLayer]);

  return (
    <LayersControl position="topright">
      {routes &&
        routes.map((r) => {
          return (
            <LayersControl.Overlay
              name={`${r.route_id} ${r.route_long_name}`}
              key={r.route_id}
            >
              <LayerGroup name={`${r.route_id} ${r.route_long_name}`}>
                {fetchedTrips[r.route_id] && (
                  <Polyline
                    pathOptions={{ color: `#${r.route_color}`, weight: 5 }}
                    positions={fetchedTrips[r.route_id]}
                  />
                )}
              </LayerGroup>
            </LayersControl.Overlay>
          );
        })}
      <div className="layer-control-label">My Custom Label</div>
    </LayersControl>
  );
}
