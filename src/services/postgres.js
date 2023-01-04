const path = require("path");

const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");
console.log(__dirname);
dotenv.config({ path: path.join(__dirname, "..", "config.env"), debug: true });

console.log("NODE_ENV ", process.env.NODE_ENV);
const CONNECTION_URI = process.env.CONNECTION_URI;
console.log("CONNECTION_URI ", CONNECTION_URI);

const sequelize = new Sequelize(CONNECTION_URI);

const postgresConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sequelize, postgresConnect };
