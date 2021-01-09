"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const user_1 = __importDefault(require("../models/user"));
const PasswordException_1 = __importDefault(require("../exception/PasswordException"));
const parent_1 = __importDefault(require("../models/parent"));
class AuthController {
}
exports.AuthController = AuthController;
AuthController.login = async (req, res) => {
    let data = req.body;
    try {
        let client = await user_1.default.findAll({ where: { email: data.email } });
        if (client.length < 0)
            throw new Error(`Email don't exist!`);
        client = client[0];
        const isOk = await PasswordException_1.default.comparePassword(data.password, client.password);
        if (!isOk)
            throw new Error(`User is undefined!`);
        console.log(client);
        const theToken = await jsonwebtoken_1.sign({ id: client.id, email: client.email }, process.env.JWT_KEY, { expiresIn: '5m' });
        const token = {
            token: theToken,
            expired: await jsonwebtoken_1.decode(theToken).exp
        };
        const { id, email } = client;
        return res.status(201).json({ token, client: { id, email } });
    }
    catch (err) {
        return res.status(401).json({ error: true, message: err.message }).end();
    }
};
AuthController.register = async (req, res) => {
    let data = req.body;
    console.log(data);
    try {
        if (await user_1.default.isExiste(data.email)) {
            throw new Error(`Email exist!`);
        }
        const pass = await PasswordException_1.default.hashPassword(data.password);
        const user = await user_1.default.create({
            id: null,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: pass,
            date_naissance: data.date_naissance,
            sexe: data.sexe,
        });
        const papa = await parent_1.default.create({
            User_id: user.id
        });
        console.log(user.id);
        return res.status(200).json({ message: 'utilisateur cree' });
    }
    catch (err) {
        return res.status(401).json({ error: true, message: err.message }).end();
    }
};
