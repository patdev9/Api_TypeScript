import { Request, Response } from 'express';
import User from '../models/user';
import PasswordException from '../exception/PasswordException';
import { strictLeft } from 'sequelize/types/lib/operators';
import parent from '../models/parent';
import { sequelize } from '../db/database';
import CartException from '../exception/CartExeption';
import { cart } from '../models/cart';
import { verify } from 'jsonwebtoken';
import { where } from 'sequelize/types';
import Stripe from 'stripe'
import { Abonnement } from '../models/abonnement';
const split = (token: any) => { return token.split('Bearer ').join('') }

const stripe = new Stripe(`${process.env.STRIP_KEY}`, {
    apiVersion: '2020-08-27',
});

export default class CartController {
    static addCart = async (req: Request, res: Response) => {
        let data: any = req.body
        let authorization = req.headers.authorization, decoded: any;
        decoded = verify(split(req.headers.authorization), <string>process.env.JWT_KEY);
        console.log(decoded)
        try {

            console.log(decoded.id)
            console.log(req.body)
            const cb = await cart.create({
                id: null,
                Cart_number: data.cart_number,
                month: data.month,
                year: data.year,
                default: data.default,
                parent_User_id: parseInt(decoded.id)
            })
            console.log(cb)
            return res.status(200).json({ message: 'utilisateur cree' })
        }
        catch (err) {
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }

    static payment = async (req: Request, res: Response) => {
        let data: any = req.body
        let authorization = req.headers.authorization, decoded: any;
        decoded = verify(split(req.headers.authorization), <string>process.env.JWT_KEY);
        console.log(decoded)



        try {
            const products = await stripe.products.list({
                limit: 1,
            });
            console.log(products.data[0])
            const card = await cart.findOne({ where: { parent_User_id: decoded.id } })
            if (card === null) {
                res.status(403).json({ error: true, message: 'ajouter une cart bancaire' }).end();
            } else {
                const customers = await stripe.customers.list({
                    email: decoded.email
                  });
                 // console.log('k<wjcblqjc ' +card.year)
                 // console.log(customers)
                  if(customers.data.length < 1){
                    const client = await stripe.customers.create({
                        email: decoded.email
                    })
                  }
                  const paymentMethods = await stripe.paymentMethods.list({
                    customer: customers.data[0].id,
                    type: 'card',
                  });
                  console.log(paymentMethods)
                  if(paymentMethods.data.length <1){
                    const paymentMethod = await stripe.paymentMethods.create({
                        type:'card',
                        card: {
                          number: `${card.Cart_number.toString()}`,
                          exp_month: card.month,
                          exp_year: card.year,
                          cvc: `${req.body.cvc}`,
                        },  
                      });
                      const paymentadd = await stripe.paymentMethods.attach(
                        paymentMethod.id,
                        {customer: customers.data[0].id}
                      );
                      
                  }
                 // console.log(customers.data[0].id)
                 // console.log(paymentMethods)
                  
                 const abo = await Abonnement.findOne({ where: { id: 1 } })
                  if(abo == null){
                      return res.status(409).json({
                          error:true, message:'L offre n est pas accesible'
                      })
                  }
                  const client = await stripe.customers.list({
                    email: decoded.email
                  });

                  const subscription = await stripe.subscriptions.create({
                    customer: client.data[0].id,
                    items: [
                      {price: abo.prix},
                    ],
                  });
                  parent.update({
                    Subscription:1
                  },{where:{User_id:decoded.id}})
                  
                  return res.status(200).json({error:false,message:'Votre abonnement a ete activer'})
            }
            
        }
        catch (err) {
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }
}