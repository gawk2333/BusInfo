import clientPromise from "@/lib/mongodb";

export async function getAllStops() {
  try {
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    const client = await clientPromise;
    const db = client.db("BusInfo");
    const stopsCursor = db.collection("stops").find({}).project({
      stop_id: 1,
      stop_code: 1,
      stop_name: 1,
      stop_lat: 1,
      stop_lon: 1,
    });
    const stops = await stopsCursor.toArray();
    return stops;
  } catch (e) {
    console.error(e);
  }
}
