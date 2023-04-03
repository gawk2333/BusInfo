import RoutesModel from "@/lib/models/routes.model";

export async function getAllRoutes() {
  try {
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    const routes = await RoutesModel.find({})
      .select({
        route_id: 1,
        route_long_name: 1,
        route_color: 1,
        route_text_color: 1,
      })
      .exec();
    return routes;
  } catch (e) {
    console.error(e);
  }
}
