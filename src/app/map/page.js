import dynamic from "next/dynamic";

export default function MapPage() {
  const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
  });
  return <Map />;
}
