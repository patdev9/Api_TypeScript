var test = "test index.html";
document.body.innerHTML = test;
"use strict";
var __importDefault = (this && this.__importDefault) || function(mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const dotenv_1 = require("dotenv");
const database_1 = require("./src/db/database");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./src/models/user"));
const auth_middleware_1 = require("./src/middlewares/auth.middleware");
const auth_1 = require("./src/controller/auth");
const stripe_1 = __importDefault(require("stripe"));
const user_2 = require("./src/routes/user");

const stripe = new stripe_1.default(`${process.env.STRIP_KEY}`, {
    apiVersion: '2020-08-27',
});
const a = async() => {
    const products = await stripe.products.list({
        limit: 3,
    });
    console.log(products.data);
};
const createCustomer = async() => {
    const params = {
        description: 'test customer',
    };
    const customer = await stripe.customers.create(params);
    console;
    console.log(customer.id);
};
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
dotenv_1.config();
a();
database_1.sequelize.authenticate().then(async() => {
    const users = await user_1.default.findAll(({ where: { email: 'pp@pp.pp' } }));
    console.log(users.every(user => user instanceof user_1.default)); // true
    console.log("All users:", JSON.stringify(users, null, 2));
}).catch((e) => {
    console.log(e.message);
});
app.get('/', function(req, res) {
    res.send('Hello');
});
app.use('/auth', user_2.AuthentificationRoute);
app.post('/register', auth_middleware_1.registerMidd, auth_1.AuthController.register);
app.post('/login', auth_middleware_1.loginMidd, auth_1.AuthController.login);
app.get('/hello', auth_middleware_1.authMidd, (req, res) => {
    return res.send('<h1>OOUUUIII tu es connecté</h1>');
});
console.log(process.env.DB_SEQ);
console.log('hello');
console.log(process.env.STRIP_KEY);
app.listen(process.env.PORT, () => {
    console.log(`Server run to http://localhost:${process.env.PORT}`);
});