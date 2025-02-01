import { Model, DataTypes, Sequelize } from 'sequelize';
import Agenzia from './Agenzia';

export default class Amministrazione extends Model {
    public nome!: string;
    public cognome!: string;
    public email!: string;
    public password!: string;
    public ruolo!: "GESTORE" | "SUPPORTO";

  static initialize(sequelize: Sequelize) {
    Amministrazione.init(
      {
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
        password: {
          type: DataTypes.STRING,
        },
        ruolo: {
          type: DataTypes.ENUM("GESTORE", "SUPPORTO"),
          defaultValue: "SUPPORTO",
        }
      },
      {
        sequelize,
        modelName: 'Amministrazione',
        tableName: 'amministratore',
      }
    );
  }

    static associate() {
        Agenzia.hasMany(Amministrazione);
        Amministrazione.belongsTo(Agenzia);
    }
}
