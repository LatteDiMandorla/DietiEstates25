import { Model, DataTypes, Sequelize } from 'sequelize';

export default class Utente extends Model {
    public username!: string;
    public password!: string;
    public nome!: string;
    public cognome!: string;
    public email!: string;
    public image!: string;
    public verificato!: boolean;

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
            type: DataTypes.STRING,
            allowNull: false,
        },
        cognome: {
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
        verificato: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
