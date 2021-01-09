"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = require("dotenv");
dotenv_1.config();
console.log(process.env.DB_SEQ);
exports.sequelize = new sequelize_1.Sequelize('mysql://root:root@localhost:8889/Type');
