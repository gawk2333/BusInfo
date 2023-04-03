import dynamic from "next/dynamic";
import { getAllStops } from "../api/stops";
import { initDefaultConnection } from "@/lib/mongodb/mongodb";

export default function MapPage({ stops }) {
  const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
  });
  const stopsArr = JSON.parse(stops);
  return <Map stops={stopsArr} />;
}

export async function getStaticProps() {
  initDefaultConnection().then(async () => {
    console.log(" CONNECTED TO MONGO ");
  });
  const stops = await getAllStops();
  return {
    props: {
      stops: JSON.stringify(stops),
    },
  };
}
