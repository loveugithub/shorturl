const http = require("http");

const { sequelize, postgresConnect } = require("./services/postgres");

const app = require("./app");

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await postgresConnect();
  // await sequelize.sync({ force: true });
  await sequelize.sync();
  server.listen(PORT, () =>
    console.log(`Server is listening at port ${PORT}...`)
  );
};

startServer();
