import TripsModel from "@/lib/models/trips.model";
import ShapesModel from "@/lib/models/shapes.model.js";

export default async function handler(req, res) {
  try {
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    const { routeId } = req.body;

    switch (req.method) {
      case "POST":
        const trips = await TripsModel.find({ route_id: routeId })
          .distinct("shape_id")
          .exec();

        const uniqueTrips = await Promise.all(
          trips.map(async (shapeId) => {
            const trip = await TripsModel.findOne({
              route_id: routeId,
              shape_id: shapeId,
            })
              .select({ trip_headsign: 1, shape_id: 1, _id: 0 })
              .lean();
            return trip;
          })
        );
        console.log("unique", uniqueTrips);
        if (uniqueTrips) {
          const shapeInfo = await ShapesModel.aggregate([
            {
              $match: { shape_id: { $in: uniqueTrips.map((t) => t.shape_id) } },
            },
            {
              $group: {
                _id: "$shape_id",
                shape_pts: {
                  $push: {
                    shape_pt_lat: "$shape_pt_lat",
                    shape_pt_lon: "$shape_pt_lon",
                    shape_pt_sequence: "$shape_pt_sequence",
                  },
                },
              },
            },
          ]).exec();
          console.log(shapeInfo);
          if (shapeInfo && shapeInfo.length !== 0) {
            const shapes = shapeInfo.map((shape) => {
              const sortedShapePts = shape.shape_pts
                .sort((a, b) => a.shape_pt_sequence - b.shape_pt_sequence)
                .map((s) => {
                  return [s.shape_pt_lat, s.shape_pt_lon];
                });
              return { ...shape, shape_pts: sortedShapePts };
            });
            // console.log(JSON.stringify(shapes));
            res.json({
              error: false,
              data: JSON.stringify(shapes),
            });
          } else {
            res.json({
              error: true,
              message: `Shape does not exist`,
            });
          }
        } else {
          res.json({
            error: true,
            message: `Route does not exist`,
          });
        }
        break;
    }
  } catch (e) {
    res.json({
      error: true,
      message: `Database Error: ${e}`,
    });
  }
}
