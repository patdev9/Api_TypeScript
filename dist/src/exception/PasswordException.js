"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
class PasswordException extends Error {
    constructor() {
        super('Password is not valid');
    }
    static isValidPassword(password) {
        return password.length >= this.MIN_PASS_SIZE;
    }
    static async hashPassword(password) {
        return await bcrypt_1.hash(password, this.SALT_ROUNDS);
    }
    static async comparePassword(password, hash) {
        return await bcrypt_1.compare(password, hash);
    }
}
exports.default = PasswordException;
PasswordException.SALT_ROUNDS = 10;
PasswordException.MIN_PASS_SIZE = 6;
