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

export class cart extends Model{
    
}

cart.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      Cart_number: {
        type:  DataTypes.STRING(128),
        allowNull: false,
      },
      month:{
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      year:{
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      default:{
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue:0
      },
      parent_User_id:{
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
          references:{
            model:parent,
            key:'User_id'
          }
      }
}, {
    tableName: "Carte_Bancaire",
    timestamps: false,
    sequelize, // passing the `sequelize` instance is required
  }
)
//cart.belongsTo(parent,{foreignKey:'User_id'})