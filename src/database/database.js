import { Sequelize } from "sequelize"; 
import config from "../config/env.js";
export const sequelize = new Sequelize(
    config.DB_DATABASE, //db name
    config.DB_USER, //db username
    config.DB_PASSWORD, //db password
    {
        host: config.DB_HOST, //db host
        dialect: config.DB_DIALECT, //db dialect
        logging: console.log(), //disable logging
    }

);