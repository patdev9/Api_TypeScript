import { decode, sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/user';
import PasswordException from '../exception/PasswordException';
import { strictLeft } from 'sequelize/types/lib/operators';
import parent from '../models/parent';
import { sequelize } from '../db/database';
import expressJwt from 'express-jwt'



export class AuthController {
    static login = async(req: Request, res: Response) => {

        let data: any = req.body;

        try {
            let client:any = await User.findAll({where:{email:data.email}});
            if (client.length < 0)
                throw new Error(`Email don't exist!`)
            client = client[0];

            const isOk = await PasswordException.comparePassword(data.password, client.password);

            if (!isOk)
                throw new Error(`User is undefined!`)
            console.log(client)
            const theToken: any = await sign({ id: client.id, email: client.email }, < string > process.env.JWT_KEY, { expiresIn: '5m' })

            const token = {
                token: theToken,
                expired: await ( < any > decode(theToken)).exp
            }
            const {id,email}=client
            return res.status(201).json({token,client:{id,email}});
        } catch (err) {
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }
    static register = async (req: Request, res: Response,)=>{
        let data: any = req.body
        console.log(data)
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
            const papa = await parent.create({
                User_id:user.id
            })
            console.log(user.id)
            
            return res.status(200).json({message:'utilisateur cree'})        
       }
       catch(err){
        return res.status(401).json({ error: true, message: err.message }).end();
       } 
    }
  
    
    
    
}
