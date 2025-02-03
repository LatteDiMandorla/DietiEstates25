import { Model, DataTypes, Sequelize } from 'sequelize';

export default class Agenzia extends Model {
    public nome!: string;
    public email!: string;
    public image!: string;
    public password!: string;

  static initialize(sequelize: Sequelize) {
    Agenzia.init(
      {
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
        }
      },
      {
        sequelize,
        modelName: 'Agenzia',
        tableName: 'agenzie',
      }
    );
  }
}
