import StopsModel from "@/lib/models/stops.model";

export async function getAllStops() {
  try {
    const stops = await StopsModel.find({})
      .select({
        stop_id: 1,
        stop_code: 1,
        stop_name: 1,
        stop_lat: 1,
        stop_lon: 1,
      })
      .exec();
    return {
      error: false,
      data: stops,
    };
  } catch (e) {
    return {
      error: true,
      message: `Database Error: ${e}`,
    };
  }
}
