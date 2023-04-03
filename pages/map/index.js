import dynamic from "next/dynamic";
import { getAllStops } from "../api/stops";
import { getAllRoutes } from "../api/routes";
import { initDefaultConnection } from "@/lib/mongodb/mongodb";

export default function MapPage({ stops, routes }) {
  const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
  });
  const stopsArr = JSON.parse(stops);
  const routesArr = JSON.parse(routes);
  return <Map stops={stopsArr} routes={routesArr} />;
}

export async function getStaticProps() {
  initDefaultConnection().then(async () => {
    console.log(" CONNECTED TO MONGO ");
  });
  const stops = await getAllStops();
  const routes = await getAllRoutes();
  return {
    props: {
      routes: JSON.stringify(routes),
      stops: JSON.stringify(stops),
    },
  };
}
