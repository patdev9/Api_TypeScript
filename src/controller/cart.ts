import { Request, Response } from 'express';
import User from '../models/user';
import PasswordException from '../exception/PasswordException';
import { strictLeft } from 'sequelize/types/lib/operators';
import parent from '../models/parent';
import { sequelize } from '../db/database';
import CartException from '../exception/CartExeption';
import { cart } from '../models/cart';
import { verify } from 'jsonwebtoken';
const split = (token:any) => { return token.split('Bearer ').join('') }

export default class CartController{
    static addCart = async(req:Request,res:Response)=>{
        let data:any=req.body
        let authorization = req.headers.authorization, decoded:any;
            decoded = verify(split(req.headers.authorization), < string > process.env.JWT_KEY);
            console.log(decoded)
        try{
            
                console.log(decoded.id)
                console.log(req.body)
                const cb = await cart.create({
                    id:null,
                    Cart_number:data.cart_number,
                    month:data.month,
                    year:data.year,
                    default:data.default,
                    parent_User_id:parseInt(decoded.id)
                })
                console.log(cb)
                return res.status(200).json({message:'utilisateur cree'})        
           }
           catch(err){
            return res.status(401).json({ error: true, message: err.message }).end();
           }
    }
}