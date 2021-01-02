import { decode, sign } from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/user';
import PasswordException from '../exception/PasswordException';
import { strictLeft } from 'sequelize/types/lib/operators';
import parent from '../models/parent';
import { sequelize } from '../db/database';



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

            const theToken: any = await sign({ id: client.personne_idpersonne, name: client.fullname }, < string > process.env.JWT_KEY, { expiresIn: '1m' })

            const token = {
                token: theToken,
                expired: await ( < any > decode(theToken)).exp
            }
            return res.status(201).json(token);
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
            const user = await parent.create({
                id:null,
                firstname: data.firstname,
                lastname:data.lastname,
                email:data.email,
                password:pass,
                date_naissance:data.date_naissance,
                sexe:data.sexe
            })
            console.log(user.id)
            
            return res.status(200).json({message:'utilisateur cree'})        
       }
       catch(err){
        return res.status(401).json({ error: true, message: err.message }).end();
       }
       
    }
}
