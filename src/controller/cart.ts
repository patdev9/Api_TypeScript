import { Request, Response } from 'express';
import User from '../models/user';
import PasswordException from '../exception/PasswordException';
import { strictLeft } from 'sequelize/types/lib/operators';
import parent from '../models/parent';
import { sequelize } from '../db/database';
import CartException from '../exception/CartExeption';
import { cart } from '../models/cart';


export default class CartController{
    static addCart = async(req:Request,res:Response)=>{
        let data:any=req.body
        try{
           
                
                const cart_number = await CartException.hashCart(data.cart_number);
                const user = await cart.create({
                    id:null,
                    firstname: data.firstname,
                    lastname:data.lastname,
                    email:data.email,
                    password:cart_number,
                    date_naissance:data.date_naissance,
                    sexe:data.sexe,
                    
                })
                
               
                
                return res.status(200).json({message:'utilisateur cree'})        
           }
           catch(err){
            return res.status(401).json({ error: true, message: err.message }).end();
           }
    }
}