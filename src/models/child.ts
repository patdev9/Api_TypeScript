import { sequelize } from '../db/database';
import User from './user';
import {UserInterface } from './user';
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



export default class enfant extends User {
    User_id:number | null | undefined
    parent_User_id?:number
}

enfant.init({
   User_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
      },
   parent_User_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
      },
   
    },
    
      {
        tableName: "enfant",
        timestamps: false,
        sequelize, // passing the `sequelize` instance is required
      }
)

console.log('test')
enfant.belongsTo(User,{foreignKey:'User_id'})

//Abonnement.belongsToMany(Abonnement,{through:'parent_has_abonnement'})
//parent.belongsToMany(Abonnement, { through: parent_has_Abonnement });