"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../db/database");
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    get iid() {
        return this.id;
    }
    get fullname() {
        return this.firstname + ' ' + this.lastname;
    }
    static async isExiste(email) {
        let user = await User.findAll({ where: { email: email } });
        if (user.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.default = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    firstname: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    lastname: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: true,
    },
    email: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: true,
    },
    password: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    date_naissance: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    sexe: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
}, {
    tableName: "User",
    sequelize: database_1.sequelize,
});
