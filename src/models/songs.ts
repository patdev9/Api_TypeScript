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

export default class songs extends Model{
    id!:number
    name!:string
    url!: string
    cover!: string
    time!: string
    type!:string
}

songs.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      url: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      cover: {
        type: new DataTypes.STRING(128),
        allowNull: true,
      },
      time:{
          type:new DataTypes.STRING(128),
          allowNull: false,
      },
      type:{
          type:new DataTypes.STRING(128),
          allowNull: false,
      },
    },
    {
      tableName: "songs",
      sequelize, // passing the `sequelize` instance is required
    })