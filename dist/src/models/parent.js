"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../db/database");
const user_1 = __importDefault(require("./user"));
const sequelize_1 = require("sequelize");
class parent extends user_1.default {
}
exports.default = parent;
parent.init({
    User_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
    },
}, {
    tableName: "parent",
    timestamps: false,
    sequelize: database_1.sequelize,
});
console.log('test');
parent.belongsTo(user_1.default, { foreignKey: 'User_id' });
//parent.belongsToMany(Abonnement, { through: parent_has_Abonnement });
