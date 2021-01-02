import {Sequelize} from 'sequelize'
import { config } from "dotenv";
config()
console.log(process.env.DB_SEQ)

export const sequelize = new Sequelize('mysql://root:root@localhost:8889/Type')