import { Model, DataTypes, Sequelize } from 'sequelize';
import Agente from './Agente';

export default class Immobile extends Model {
    public title!: string;
    public description!: string;
    public street!: string;
    public size!: number;
    public bathrooms!: number;
    public locals!: number;
    public price!: number;
    public efficienza!: string;
    public type!: string;
    public images!: string[];
    public lat!: number;
    public lon!: number;

  static initialize(sequelize: Sequelize) {
    Immobile.init(
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        street: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bathrooms: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        locals: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        efficienza: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        images: {
            type: DataTypes.TEXT, // Memorizzato come JSON
            allowNull: false,
            defaultValue: '[]', // Default: array vuoto
            get() {
              const rawValue = this.getDataValue('images');
              return rawValue ? JSON.parse(rawValue) : [];
            },
            set(value: string[]) {
              this.setDataValue('images', JSON.stringify(value));
            },
        },
        lat: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        lon: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        tags: {
            type: DataTypes.TEXT, // Memorizzato come JSON
            allowNull: false,
            defaultValue: '[]', // Default: array vuoto
            get() {
              const rawValue = this.getDataValue('tags');
              return rawValue ? JSON.parse(rawValue) : [];
            },
            set(value: string[]) {
              this.setDataValue('tags', JSON.stringify(value));
            },
        },
      },
      {
        sequelize,
        modelName: 'Immobile',
        tableName: 'immobili',
      }
    );
  }

    static associate() {
      Agente.hasMany(Immobile);
      Immobile.belongsTo(Agente);
    }
}
