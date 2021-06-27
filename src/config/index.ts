const config = () => ({
  port: process.env.PORT,
  mongodb: {
    uri: process.env.MONGO_URI,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: "7d",
  },
  storage: {
    rootPath: "./uploads",
  },
});

export default config;
