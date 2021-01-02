import { sequelize } from '../db/database';
import User from './user';
import {UserInterface } from './user';
import { Abonnement } from './abonnement';
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
export interface parentInetrface {
    user_id:number| null | undefined;
}

export default class parent extends User implements parentInetrface{
    user_id:number | null | undefined
    
}

parent.belongsTo(User)
parent.belongsToMany(Abonnement, { through: parent_has_Abonnement });