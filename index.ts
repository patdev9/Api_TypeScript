import express from 'express'
const app = express()
import { config } from "dotenv";
import { sequelize } from './src/db/database';
import bodyParser from "body-parser";
import cors from "cors";
import User from './src/models/user';
import { registerMidd, loginMidd } from './src/middlewares/auth.middleware';
import { AuthController } from './src/controller/auth';


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

config()


sequelize.authenticate().then(async ()=>{
    const users = await User.findAll(({where:{email:'pp@pp.pp'}}));
console.log(users.every(user => user instanceof User)); // true
console.log("All users:", JSON.stringify(users, null, 2));
}).catch( (e:any)=>{
    console.log(e.message)
})

app.get('/', function (req, res) {
  res.send('Hello')
})
app.post('/register', registerMidd, AuthController.register)
app.post('/login', loginMidd, AuthController.login)
console.log(process.env.DB_SEQ)
console.log('hello')
 
app.listen(process.env.PORT, () => {
    console.log(`Server run to http://localhost:${process.env.PORT}`);
})