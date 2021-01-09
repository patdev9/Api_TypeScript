"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
class CartException extends Error {
    constructor() {
        super('Le numero de la carte est invalide');
    }
    static isValidCart(cart_number) {
        return cart_number.length == this.MIN_PASS_SIZE;
    }
    static async hashCart(cart_number) {
        return await bcrypt_1.hash(cart_number, this.SALT_ROUNDS);
    }
    static async comparecart_number(cart_number, hash) {
        return await bcrypt_1.compare(cart_number, hash);
    }
}
exports.default = CartException;
CartException.SALT_ROUNDS = 10;
CartException.MIN_PASS_SIZE = 16;
