import mongoose from "mongoose";
mongoose.Promise = global.Promise;
const { Schema } = mongoose;

const RoutesModel = new Schema({
  route_id: {
    type: Schema.Types.Mixed,
    required: true,
  },
  agency_id: {
    type: String,
    required: true,
  },
  route_short_name: {
    type: Schema.Types.Mixed,
    required: true,
  },
  route_long_name: {
    type: String,
    required: true,
  },
  route_desc: {
    type: String,
  },
  route_type: {
    type: Number,
  },
  route_url: {
    type: String,
  },
  route_color: {
    type: String,
  },
  route_text_color: {
    type: String,
  },
});

let Routes;

if (mongoose.models.Routes) {
  Routes = mongoose.model("Routes");
} else {
  Routes = mongoose.model("Routes", RoutesModel);
}

export default Routes;
