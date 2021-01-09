import { Request, Response } from 'express';
import { decode, sign } from 'jsonwebtoken';
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
import enfant from '../models/child';
import songs from '../models/songs';
import { Url } from 'url';
const stripe = new Stripe(`${process.env.STRIP_KEY}`, {
    apiVersion: '2020-08-27',
});
const split = (token: any) => { return token.split('Bearer ').join('') }

export class songController{
    static getsong=async(req:Request,res:Response)=>{
        let data: any = req.body
        let authorization = req.headers.authorization, decoded: any;
        decoded = verify(split(req.headers.authorization), <string>process.env.JWT_KEY);
        try{

            let bebe = await enfant.findOne({where:{User_id:decoded.id}})
            let papa = await parent.findOne({where:{User_id:bebe?.parent_User_id}})
            if(papa?.Subscription == 1){
                let sons = await songs.findAll()
                sons.every(beb=>beb instanceof songs)
                    console.log('fdfds'+ JSON.stringify(sons, null,3))
                    return res.status(200).json(sons)
            }
            else{
                return res.status(403).json({error:true,message:'Votre avonnement ne vous permet pas de faire ca'})
            }
        }
        catch(err){
            return res.status(401).json({ error: true, message: err.message }).end();
           } 
        
    }
    static oneSong=async(req:Request,res:Response, )=>{
        let id = req.params.id
        console.log('fsqdsqdsqdsqdf')
        let data: any = req.body
        let authorization = req.headers.authorization, decoded: any;
        decoded = verify(split(req.headers.authorization), <string>process.env.JWT_KEY);
        try{

            let bebe = await enfant.findOne({where:{User_id:decoded.id}})
            let papa = await parent.findOne({where:{User_id:bebe?.parent_User_id}})
            if(papa?.Subscription == 1){
                let sons = await songs.findOne({where:{id:id}})   
                const plans = await stripe.plans.list({limit: 3});
                console.log(plans)
                    return res.status(200).json(sons)
            }
            else{
                return res.status(403).json({error:true,message:'Votre avonnement ne vous permet pas de faire ca'})
            }
        }
        catch(err){
            return res.status(401).json({ error: true, message: err.message }).end();
           } 
    }
    static getfact=async(req:Request,res:Response)=>{
        let authorization = req.headers.authorization, decoded: any;
        decoded = verify(split(req.headers.authorization), <string>process.env.JWT_KEY);

    }
}