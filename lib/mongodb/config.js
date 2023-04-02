const mongoConfig = {
  mongoURI: process.env.MONGODB_URI,
  dbConnectionOptions: {
    useNewUrlParser: true,
  },
};

export default mongoConfig;
