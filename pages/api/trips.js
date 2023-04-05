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
        const { shape_id } = await TripsModel.findOne({
          route_id: routeId,
        }).select({
          shape_id: 1,
        });
        if (shape_id) {
          const shapeInfo = await ShapesModel.find({ shape_id: shape_id })
            .select({
              shape_pt_lat: 1,
              shape_pt_lon: 1,
              shape_pt_sequence: 1,
            })
            .exec();
          if (shapeInfo && shapeInfo.length !== 0) {
            const shape = shapeInfo
              .sort((a, b) => a.shape_pt_sequence - b.shape_pt_sequence)
              .map((s) => {
                return [s.shape_pt_lat, s.shape_pt_lon];
              });
            res.json({
              error: false,
              data: shape,
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
