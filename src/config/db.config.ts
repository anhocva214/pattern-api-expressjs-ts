import { ENV } from "@helpers/env.helper";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  ENV.MYSQL_DB as string,
  ENV.MYSQL_USER as string,
  ENV.MYSQL_PASS as string,
  {
    host: ENV.MYSQL_HOST as string,
    port: parseInt(ENV.MYSQL_PORT as string),
    dialect: "mysql",
  }
);
