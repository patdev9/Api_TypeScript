import { Router } from 'express';

import {registerMidd, loginMidd, authMidd } from '../middlewares/auth.middleware';
import { AuthController } from '../controller/auth';
import CartController from '../controller/cart';
import { UserController } from '../controller/user';



const route: Router = Router();


route.get('/', authMidd, (req: any, res: any) => {
    return res.end('<h1>OOUUUIII tu es connecté</h1>')
})
route.post('/login', loginMidd, AuthController.login)
route.post('/register', registerMidd, AuthController.register)
route.post('/cart',authMidd, CartController.addCart)
route.post('/subscription',authMidd, CartController.payment)
route.put('/user',authMidd, UserController.modifi )
route.delete('/user/off',authMidd, UserController.deco )
route.post('/user/child',authMidd, UserController.child)
route.delete('/user/child',authMidd, UserController.childdelete)
route.get('/user/child',authMidd, UserController.childget)

export { route as AuthentificationRoute }