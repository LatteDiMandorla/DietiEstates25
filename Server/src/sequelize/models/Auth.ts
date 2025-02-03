import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import Agenzia from './Agenzia';
import { Auth as AuthT, Role } from '../../models/AuthT';

export default class Auth extends Model<AuthT, Optional<AuthT, "id" | "password" | "info">> implements AuthT {
    public id!: number;
    public email!: string;
    public password!: string;
    public verified!: boolean;
    public ruolo!: Role;

    static initialize(sequelize: Sequelize) {
        Auth.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING,
                },
                verified: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
                ruolo: {
                    type: DataTypes.ENUM("CLIENTE", "AGENTE", "GESTORE", "SUPPORTO"),
                    allowNull: false,
                    defaultValue: "CLIENTE",
                }
            },
            {
                sequelize,
                modelName: 'Auth',
                tableName: 'autenticazione',
            }
        );
    }
}
