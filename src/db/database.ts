import {Sequelize} from 'sequelize'
import { config } from "dotenv";
config()
console.log(process.env.DB_SEQ)

export const sequelize = new Sequelize(`${process.env.DB_SEQ}`)