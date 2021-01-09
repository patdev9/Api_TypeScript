"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CartExeption_1 = __importDefault(require("../exception/CartExeption"));
const cart_1 = require("../models/cart");
class CartController {
}
exports.default = CartController;
CartController.addCart = async (req, res) => {
    let data = req.body;
    try {
        const cart_number = await CartExeption_1.default.hashCart(data.cart_number);
        const user = await cart_1.cart.create({
            id: null,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: cart_number,
            date_naissance: data.date_naissance,
            sexe: data.sexe,
        });
        return res.status(200).json({ message: 'utilisateur cree' });
    }
    catch (err) {
        return res.status(401).json({ error: true, message: err.message }).end();
    }
};
