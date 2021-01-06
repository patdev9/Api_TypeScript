import { Router } from 'express';

import {registerMidd, loginMidd, authMidd } from '../middlewares/auth.middleware';
import { AuthController } from '../controller/auth';
import CartController from '../controller/cart';



const route: Router = Router();


route.get('/updateUser', authMidd, (req: any, res: any) => {
    return res.end('<h1>Modification User</h1>')
})
route.post('/login', loginMidd, AuthController.login)
route.post('/register', registerMidd, AuthController.register)
route.post('/cart',authMidd, CartController.addCart)


export { route as AuthentificationRoute }

//test