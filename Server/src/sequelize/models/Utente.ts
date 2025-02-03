import { Model, DataTypes, Sequelize } from 'sequelize';
import Auth from './Auth';

export default class Utente extends Model {
    public username!: string;
    public nome!: string;
    public cognome!: string;
    public image?: string;

    static initialize(sequelize: Sequelize) {
        Utente.init(
            {
                username: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                nome: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                cognome: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                image: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
            },
            {
                sequelize,
                modelName: 'Utente',
                tableName: 'utenti',
            }
        );
    }

    static associate() {
        Auth.hasOne(Utente, {foreignKey: "AuthId"});
        Utente.belongsTo(Auth, {foreignKey: "AuthId"});
    }
}
