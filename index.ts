import express from 'express'
const app = express()
import { config } from "dotenv";
import { sequelize } from './src/db/database';
import bodyParser from "body-parser";
import cors from "cors";
import User from './src/models/user';
import { registerMidd, loginMidd } from './src/middlewares/auth.middleware';
import { AuthController } from './src/controller/auth';
import Stripe from 'stripe'
import { AuthentificationRoute } from "./src/routes/user";



const stripe = new Stripe(`${process.env.STRIP_KEY}`,{
    apiVersion: '2020-08-27',
  });
(async () => {
    const account = await stripe.accounts.create({
        type: 'express',
      });
});
const createCustomer = async () => {
    const params: Stripe.CustomerCreateParams = {
      description: 'test customer',
    };
  
    const customer: Stripe.Customer = await stripe.customers.create(params);
  
    console.log(customer.id);
  };

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

config()


sequelize.authenticate().then(async ()=>{
    const users = await User.findAll(({where:{email:'pp@pp.pp'}}));
console.log(users.every(user => user instanceof User)); // true
console.log("All users:", JSON.stringify(users, null, 2));
}).catch( (e:any)=>{
    console.log(e.message)
})

app.get('/', function (req, res) {
  res.send('Hello')
})
app.use('/auth', AuthentificationRoute);
app.post('/register', registerMidd, AuthController.register)
app.post('/login', loginMidd, AuthController.login)
console.log(process.env.DB_SEQ)
console.log('hello')
 console.log(process.env.STRIP_KEY)
app.listen(process.env.PORT, () => {
    console.log(`Server run to http://localhost:${process.env.PORT}`);
})