import { sequelize } from '../db/database';
import EmailException from '../exception/EmailException';
import PasswordException from '../exception/PasswordException';
import { Abonnement } from './abonnement';
import parent from './parent';


import {Sequelize,
    Model,
    ModelDefined,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    Optional,} from 'sequelize'

    

export interface UserInterface{
    id:number | null
    firstname:string
    lastname:string
    email:string
    password:string
    date_naissance:Date
    sexe:string
    
}



export default class User extends Model{

    
    public id!:number;
    public firstname!: string;
    public lastname!: string;
    public email!: string;
    public password!: string;
    public date_naissance!: Date;
    public sexe!:string;

    get iid(): number {
        return <number > this.id;
    }

    get fullname(): string {
        return this.firstname + ' ' + this.lastname;
    }

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static async isExiste(email: string) {
        
        let user:any = await User.findAll({where:{email:email}})
           if(user.length > 0){
               return true
           }
           else{
               return false
           }
       
    }
}

User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      firstname: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      lastname: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      password:{
          type:new DataTypes.STRING(128),
          allowNull: false,
      },
      date_naissance:{
          type:new DataTypes.STRING(128),
          allowNull: false,
      },
      sexe:{
          type:new DataTypes.STRING(128),
          allowNull: false,
      },
      
    },
    {
      tableName: "User",
      sequelize, // passing the `sequelize` instance is required
    }
  );

  