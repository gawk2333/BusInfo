const mongoConfig = {
  mongoURI: process.env.MONGODB_URI,
  dbConnectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

export default mongoConfig;
