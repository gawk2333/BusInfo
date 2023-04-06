import RoutesModel from "@/lib/models/routes.model";

export async function getAllRoutes() {
  try {
    const routes = await RoutesModel.find({})
      .select({
        route_id: 1,
        route_long_name: 1,
        route_color: 1,
        route_text_color: 1,
      })
      .exec();
    return {
      error: false,
      data: routes,
    };
  } catch (e) {
    return {
      error: true,
      message: `Database Error: ${e}`,
    };
  }
}
