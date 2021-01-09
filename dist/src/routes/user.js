"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthentificationRoute = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const auth_1 = require("../controller/auth");
const route = express_1.Router();
exports.AuthentificationRoute = route;
route.get('/', auth_middleware_1.authMidd, (req, res) => {
    return res.end('<h1>OOUUUIII tu es connecté</h1>');
});
route.post('/login', auth_middleware_1.loginMidd, auth_1.AuthController.login);
route.post('/register', auth_middleware_1.registerMidd, auth_1.AuthController.register);
