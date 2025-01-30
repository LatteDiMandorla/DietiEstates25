import { Model, DataTypes, Sequelize } from 'sequelize';

export default class Utente extends Model {
    public username!: string;
    public password!: string;
    public nome!: string;
    public cognome!: string;
    public email!: string;
    public image!: string;

  static initialize(sequelize: Sequelize) {
    Utente.init(
      {
        username: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        nome: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cognome: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        email: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
      },
      {
        sequelize,
        modelName: 'Utente',
        tableName: 'utenti',
      }
    );
  }
}
