import mongoose from "mongoose";
mongoose.Promise = global.Promise;
const { Schema } = mongoose;

const StopsModel = new Schema({
  stop_id: {
    type: Number,
    required: true,
  },
  stop_code: {
    type: Number,
    required: true,
  },
  stop_name: {
    type: String,
    required: true,
  },
  stop_desc: {
    type: String,
  },
  stop_lat: {
    type: Number,
  },
  stop_lon: {
    type: Number,
  },
  zone_id: {
    type: String,
  },
  zone_url: {
    type: String,
  },
  location_type: {
    type: String,
  },
  parent_station: {
    type: String,
  },
  stop_timezone: {
    type: String,
  },
  wheelchair_boarding: {
    type: Number,
    default: 1,
  },
});

let Stops;

if (mongoose.models.Stops) {
  Stops = mongoose.model("Stops");
} else {
  Stops = mongoose.model("Stops", StopsModel);
}

export default Stops;
