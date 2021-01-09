import express from 'express'
const app = express()
import { config } from "dotenv";
import { sequelize } from './src/db/database';
import bodyParser from "body-parser";
import cors from "cors";
import User from './src/models/user';
import { registerMidd, loginMidd, authMidd } from './src/middlewares/auth.middleware';
import { AuthController } from './src/controller/auth';
import Stripe from 'stripe'
import { AuthentificationRoute } from "./src/routes/user";
import parent from './src/models/parent';
import { Request, Response } from 'express';
import { Abonnement } from './src/models/abonnement';




const stripe = new Stripe(`${process.env.STRIP_KEY}`,{
    apiVersion: '2020-08-27',
  });

const abonnement = async () => {
    const product = await stripe.products.create({
        name: 'Zoubify',
        description:'Abnnement a zoubify'
      });
      const price = await stripe.prices.create({
        unit_amount: 1000,
        currency: 'eur',
        recurring: {interval: 'month'},
        product: product.id,
      });
      console.log(price.id)
      const abonnemet = await Abonnement.create({
          ref:product.id,
          nom:product.name,
          prix:price.id
      })
      console.log(abonnemet)
};

//abonnement() //Enlever le commentaire pour crée le produit

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

config()


app.get('/', function (req, res) {
  res.send('Hello')
})
app.use('/', AuthentificationRoute);


app.get('/hello', authMidd, (req: Request, res: Response) => {
    return res.send('<h1>OOUUUIII tu es connecté</h1>')
})

app.get('/pp', function(req:Request, res:Response) {
    res.sendFile(__dirname+'/index.html');
    
   });
app.get('/style', function(req:Request, res:Response) {
    res.sendFile(__dirname+'/style.css')
    
   });

console.log(process.env.DB_SEQ)
 console.log(process.env.STRIP_KEY)
app.listen(process.env.PORT, () => {
    console.log(`Server run to http://localhost:${process.env.PORT}`);
})