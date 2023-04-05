import mongoose from "mongoose";
mongoose.Promise = global.Promise;
const { Schema } = mongoose;

const TripsModel = new Schema({
  route_id: {
    type: Number,
    required: true,
  },
  service_id: {
    type: Number,
    required: true,
  },
  trip_id: {
    type: Number,
    required: true,
  },
  trip_headsign: {
    type: String,
    required: true,
  },
  trip_short_name: {
    type: String,
  },
  direction_id: {
    type: Number,
    required: true,
  },
  block_id: {
    type: Number,
    required: true,
  },
  shape_id: {
    type: Number,
    required: true,
  },
  wheelchair_accessible: {
    type: Number,
  },
  bike_allowed: {
    type: Number,
  },
});

let Trips;

if (mongoose.models.Trips) {
  Trips = mongoose.model("Trips");
} else {
  Trips = mongoose.model("Trips", TripsModel);
}

export default Trips;
