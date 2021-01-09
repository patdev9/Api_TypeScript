import { Router } from 'express';

import {registerMidd, loginMidd, authMidd } from '../middlewares/auth.middleware';
import { AuthController } from '../controller/auth';
import CartController from '../controller/cart';
import { UserController } from '../controller/user';
import { songController } from '../controller/song';



const route: Router = Router();


route.get('/', authMidd, (req: any, res: any) => {
    return res.end('<h1>OOUUUIII tu es connecté</h1>')
})

route.post('/login', loginMidd, AuthController.login)
route.post('/register', registerMidd, AuthController.register)
route.post('/user/cart',authMidd,UserController.isParent ,CartController.addCart)
route.post('/subscription',authMidd,UserController.isParent , CartController.payment)
route.put('/user',authMidd,UserController.isParent , UserController.modifi )
route.delete('/user/off',authMidd,UserController.isParent , UserController.deco )
route.post('/user/child',authMidd,UserController.isParent , UserController.child)
route.delete('/user/child',authMidd,UserController.isParent , UserController.childdelete)
route.get('/user/child',authMidd,UserController.isParent , UserController.childget)
route.delete('/user',authMidd,UserController.isParent , UserController.deleteUser)
route.get('/songs',authMidd,songController.getsong)
route.get('/songs/:id',authMidd,songController.oneSong)
route.get('/bills',authMidd,songController.getfact)

export {route as AuthentificationRoute}