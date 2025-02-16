import { Model, DataTypes, Sequelize } from 'sequelize';
import Agenzia from './Agenzia';
import Auth from './Auth';

export default class Agente extends Model {
    public nome!: string;
    public cognome!: string;
    public image?: string;
    public biografia?: string;

    static initialize(sequelize: Sequelize) {
        Agente.init(
            {
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
                biografia: {
                    type: DataTypes.STRING,
                    allowNull: true
                }
            },
            {
                sequelize,
                modelName: 'Agente',
                tableName: 'agenti',
                defaultScope: {
                    include: [{
                        model: Agenzia,
                        as: "Agenzia"
                    }]
                }
            }
        );
    }

    static associate() {
        Agenzia.hasMany(Agente, {foreignKey: "AgenziaId", as: "Agenti" });
        Agente.belongsTo(Agenzia, {foreignKey: "AgenziaId", as: "Agenzia" });
        
        Auth.hasOne(Agente, {foreignKey: "AuthId"});
        Agente.belongsTo(Auth, {foreignKey: "AuthId"});
    }
}
