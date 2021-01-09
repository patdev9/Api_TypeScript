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
    Optional,
    BelongsToMany,} from 'sequelize'
    import { sequelize } from '../db/database';
import parent from './parent';

export class Abonnement extends Model {
    ref!: string
    nom!: string
    prix!:string
}
Abonnement.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
      },
      ref:{
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      nom:{
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      prix:{
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    },
      {
        tableName: "abonnement",
        timestamps: false,
        sequelize, // passing the `sequelize` instance is required
      }
)
Abonnement.belongsToMany(parent,{through:'parent_has_abonnement'})