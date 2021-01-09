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
const split = (token: any) => { return token.split('Bearer ').join('') }

export class UserController{
    static modifi = async(req:Request,res:Response)=>{
        let data: any = req.body
        let authorization = req.headers.authorization, decoded: any;
        decoded = verify(split(req.headers.authorization), <string>process.env.JWT_KEY);
        const user = await User.findOne({ where: { id: decoded.id } })
        User.update({
            firstname:data.firstname || user?.firstname,
            lastname:data.lastname|| user?.lastname,
            date_naissance:data.date_naissance || user?.date_naissance,
            sexe:data.sexe || user?.sexe
          },{where:{id:decoded.id}})
        
          return res.status(200).json({error:false, message: 'Vos données ont été mis a jours'} )
    }
    static deco = async(req:Request,res:Response)=>{
        
        const theToken: any = await sign({ id: "", email: "" }, < string > process.env.JWT_KEY, { expiresIn: '5m' })

        const token = {
            token: theToken,
            expired: await ( < any > decode(theToken)).exp
        }
        return res.status(201).json({message: "Vous etes deconnecter"});
    }
    static child = async(req:Request,res:Response)=>{
        let data: any = req.body
        let authorization = req.headers.authorization, decoded: any;
        decoded = verify(split(req.headers.authorization), <string>process.env.JWT_KEY);
        try{
            if (await User.isExiste(data.email)){
    
                throw new Error(`Email exist!`)
            }
    
                const pass = await PasswordException.hashPassword(data.password);
                const user = await User.create({
                    id:null,
                    firstname: data.firstname,
                    lastname:data.lastname,
                    email:data.email,
                    password:pass,
                    date_naissance:data.date_naissance,
                    sexe:data.sexe,
                })
                const bebe = await enfant.create({
                    User_id:user.id,
                    parent_User_id:decoded.id
                })
                
                
                return res.status(200).json({message:'utilisateur cree'})        
           }
           catch(err){
            return res.status(401).json({ error: true, message: err.message }).end();
           } 
        }
      
        static isParent = async(req: Request, res: Response, next: () => void) =>{
            let authorization = req.headers.authorization, decoded:any;
                    decoded = verify(split(req.headers.authorization), < string > process.env.JWT_KEY);
                    const papa = await parent.findOne({ where: { User_id: decoded.id } })
                    if (papa)
                    return next()
        }

        static childdelete = async(req:Request,res:Response)=>{
            let authorization = req.headers.authorization, decoded: any;
            decoded = verify(split(req.headers.authorization), <string>process.env.JWT_KEY);
            const bebe = await enfant.findOne({where:{User_id:req.body.id}})
            if(!bebe){
               return res.status(403).json({error:true,message:'enfant pas trouver'})
            }
            if(bebe?.parent_User_id == decoded.id){
                enfant.destroy({where:{User_id:req.body.id}})
                User.destroy({where:{id:req.body.id}})
                return res.status(200).json({error:false,message:'l utilisateur a été supprimer'})
            }
            else{
                return res.status(403).json({error:true,message:'Vous ne pouvez pas supprimer cette enfant'})
            }
        }
        static childget = async(req:Request,res:Response)=>{
            let authorization = req.headers.authorization, decoded: any;
            decoded = verify(split(req.headers.authorization), <string>process.env.JWT_KEY);
            try{
                let bebe = enfant.findAll({where:{parent_User_id:decoded.id} })
                if(bebe){
                     (await bebe).every(beb=>beb instanceof enfant)
                    console.log('fdfds'+ JSON.stringify(bebe, null,3))
                    return res.status(200).json(bebe)
                }
            }
            catch(err){
            return res.status(401).json({ error: true, message: err.message }).end();
           } 
           
        }
        
    }
