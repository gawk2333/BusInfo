import dynamic from "next/dynamic";
import { getAllStops } from "../api/stopsRoute";

export default function MapPage({ stops }) {
  const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
  });
  const stopsArr = JSON.parse(stops);
  return <Map stops={stopsArr} />;
}

export async function getStaticProps() {
  const result = await getAllStops();
  return {
    props: {
      stops: JSON.stringify(result),
    },
  };
}
