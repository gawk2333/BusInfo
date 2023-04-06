import dynamic from "next/dynamic";
import { initDefaultConnection } from "@/lib/mongodb/mongodb";
import fetch from "node-fetch";

const domainUrl =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export default function MapPage({ stops, routes }) {
  const Map = dynamic(() => import("@/components/Map"), {
    ssr: false,
  });
  return <Map stops={stops} routes={routes} />;
}

export async function getStaticProps() {
  initDefaultConnection().then(async () => {
    console.log(" CONNECTED TO MONGO ");
  });
  const stopsRes = await fetch(`${domainUrl}/api/stops`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const stopsJson = await stopsRes.json();
  const routeRes = await fetch(`${domainUrl}/api/routes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const routesJson = await routeRes.json();
  console.log("stops", JSON.parse(stopsJson.data));
  return {
    props: {
      stops: JSON.parse(stopsJson.data),
      routes: JSON.parse(routesJson.data),
    },
  };
  // let staticProps = { props: {} };

  // if (!stopsJson.error) {
  //   staticProps.props.stops = JSON.parse(stopsJson.data);
  // } else {
  //   staticProps.props.stops = [];
  // }

  // if (!stopsJson.error) {
  //   staticProps.props.routes = JSON.parse(routesJson.data);
  // } else {
  //   staticProps.props.routes = [];
  // }

  // return staticProps;
}
