// src/config/database.ts
import { config } from "./index";

const sequelizeConfig = {
  development: {
    username: config.database.user,
    password: config.database.password,
    database: config.database.name,
    host: config.database.host,
    dialect: "mysql",
  },
  test: {
    username: config.database.user,
    password: config.database.password,
    database: config.database.name + "_test",
    host: config.database.host,
    dialect: "mysql",
  },
  production: {
    username: config.database.user,
    password: config.database.password,
    database: config.database.name,
    host: config.database.host,
    dialect: "mysql",
  },
};

export default sequelizeConfig;
