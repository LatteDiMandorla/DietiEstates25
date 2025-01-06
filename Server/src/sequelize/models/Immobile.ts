import { Model, DataTypes, Sequelize } from 'sequelize';

export default class Immobile extends Model {
    public title!: string;
    public street!: string;
    public size!: string;
    public bathrooms!: string;
    public locals!: string;
    public agentImage!: string; 
    public price!: string;
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
        agentImage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
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
        }
      },
      {
        sequelize,
        modelName: 'Immobile',
        tableName: 'immobili',
      }
    );
  }
}
