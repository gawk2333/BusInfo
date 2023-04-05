import dynamic from "next/dynamic";
import { initDefaultConnection } from "@/lib/mongodb/mongodb";

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
  try {
    const stopsRes = await fetch(`${domainUrl}/api/stops`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const routeRes = await fetch(`${domainUrl}/api/routes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const stopsJson = await stopsRes.json();
    const routesJson = await routeRes.json();

    let staticProps = { props: {} };

    if (!stopsJson.error) {
      staticProps.props.stops = stopsJson.data;
    } else {
      staticProps.props.stops = [];
    }

    if (!stopsJson.error) {
      staticProps.props.routes = routesJson.data;
    } else {
      staticProps.props.routes = [];
    }

    return staticProps;
  } catch (e) {
    throw e;
  }
}
