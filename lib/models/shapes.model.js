import mongoose from "mongoose";
mongoose.Promise = global.Promise;
const { Schema } = mongoose;

const ShapesModel = new Schema({
  shape_id: {
    type: Number,
    required: true,
    ref: "Trips",
  },
  shape_pt_lat: {
    type: Number,
    required: true,
  },
  shape_pt_lon: {
    type: Number,
    required: true,
  },
  shape_pt_squence: {
    type: Number,
    required: true,
  },
  shape_dist_traveled: {
    type: String,
  },
});

let Shapes;

if (mongoose.models.Shapes) {
  Shapes = mongoose.model("Shapes");
} else {
  Shapes = mongoose.model("Shapes", ShapesModel);
}

export default Shapes;
