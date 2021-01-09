"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cart = void 0;
const database_1 = require("../db/database");
const parent_1 = __importDefault(require("./parent"));
const sequelize_1 = require("sequelize");
class cart extends sequelize_1.Model {
}
exports.cart = cart;
cart.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    Cart_number: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    month: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    year: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    default: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    },
    parent_User_id: {
        type: new sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true
    }
}, {
    tableName: "Carte_Bancaire",
    sequelize: database_1.sequelize,
});
cart.belongsTo(parent_1.default, { foreignKey: 'parent_User_id' });
