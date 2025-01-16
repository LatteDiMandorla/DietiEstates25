import { Model, DataTypes, Sequelize } from 'sequelize';
import Utente from './Utente';

export default class Ricerca extends Model {
    public text!: string;
    public lat!: number;
    public lon!: number;

    static initialize(sequelize: Sequelize) {
        Ricerca.init(
        {
            text: {
            type: DataTypes.STRING,
            allowNull: false,
            },
            lat: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            },
            lon: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: 'Ricerca',
            tableName: 'ricerche',
        }
        );
    }

    static associate() {
        Utente.hasMany(Ricerca);
        Ricerca.belongsTo(Utente);
    }
}
