import mongoConfig from "./config";
import mongoose from "mongoose";
mongoose.Promise = global.Promise;
// Create mongo connection
const defaultConnection = mongoose;

const initDefaultConnection = function initDefaultConnection() {
  console.log("mongoURI: ", mongoConfig.mongoURI);
  return mongoose.connect(
    mongoConfig.mongoURI,
    mongoConfig.dbConnectionOptions
  );
};

export { initDefaultConnection, defaultConnection };
