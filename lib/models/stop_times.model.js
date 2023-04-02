import mongoose from "mongoose";
mongoose.Promise = global.Promise;
const { Schema } = mongoose;

const StopTimesModel = new Schema({
  stop_id: {
    type: Number,
    required: true,
  },
  arrival_time: {
    type: String,
    required: true,
  },
  departure_time: {
    type: String,
    required: true,
  },
  stop_id: {
    type: Number,
    required: true,
  },
  stop_squence: {
    type: String,
    required: true,
  },
  stop_headsign: {
    type: String,
  },
  pickup_type: {
    type: String,
  },
  drop_off_type: {
    type: String,
  },
  shape_dist_traveled: {
    type: String,
  },
  timepoint: {
    type: String,
  },
});

let StopTimes;

if (mongoose.models.StopTimes) {
  StopTimes = mongoose.model("StopTimes");
} else {
  StopTimes = mongoose.model("StopTimes", StopTimesModel);
}

export default StopTimes;
