import { Sequelize } from "sequelize";
import config from "../config/index.js";

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: "postgres",
    logging: config.server.nodeEnv === "development" ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

//  Test database connection
export const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database conneciton established successfully.");
    return true;
  } catch (err) {
    console.log("❌ Unable to connect to the database:", err);
    return false;
  }
};

export default sequelize;
