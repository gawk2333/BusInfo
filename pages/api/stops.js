import StopsModel from "@/lib/models/stops.model";

export default async function handler(req, res) {
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
    res.json({
      error: false,
      data: JSON.stringify(stops),
    });
  } catch (e) {
    res.json({
      error: true,
      message: `Database Error: ${e}`,
    });
  }
}
