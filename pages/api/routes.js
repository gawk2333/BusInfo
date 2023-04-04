import RoutesModel from "@/lib/models/routes.model";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        const routes = await RoutesModel.find({})
          .select({
            route_id: 1,
            route_long_name: 1,
            route_color: 1,
            route_text_color: 1,
          })
          .exec();
        res.json({
          error: false,
          data: routes,
        });
        break;
    }
  } catch (e) {
    res.json({
      error: true,
      message: `Database Error: ${e}`,
    });
  }
}
