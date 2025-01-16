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
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
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
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
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
