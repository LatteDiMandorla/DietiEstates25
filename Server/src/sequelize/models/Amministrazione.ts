import { Model, DataTypes, Sequelize } from 'sequelize';
import Agenzia from './Agenzia';
import Auth from './Auth';

export default class Amministrazione extends Model {
    public nome!: string;
    public cognome!: string;
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
                ruolo: {
                    type: DataTypes.ENUM("GESTORE", "SUPPORTO"),
                    allowNull: false,
                    defaultValue: "SUPPORTO",
                }
            },
            {
                sequelize,
                modelName: 'Amministrazione',
                tableName: 'amministratori',
                defaultScope: { include: {model: Agenzia, as: "Agenzia"} }
            }
        );
    }

    static associate() {
        Agenzia.hasMany(Amministrazione, {foreignKey: "AgenziaId", as: "Amministratori" });
        Amministrazione.belongsTo(Agenzia, {foreignKey: "AgenziaId", as: "Agenzia" });

        Auth.hasOne(Amministrazione, {foreignKey: "AuthId" });
        Amministrazione.belongsTo(Auth, {foreignKey: "AuthId"});
    }
}
