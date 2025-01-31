import { Model, DataTypes, Sequelize } from 'sequelize';
import Utente from './Utente';
import Immobile from './Immobile';
import Agente from './Agente';

export default class Prenotazione extends Model {
    public data!: Date;
    public stato!: "Disponibile" | "Richiesta" | "Prenotata" | "Effettuata";

    static initialize(sequelize: Sequelize) {
        Prenotazione.init(
        {
            data: DataTypes.DATE,
            stato: {
                type: DataTypes.ENUM("Disponibile", "Richiesta", "Prenotata", "Effettuata"),
                defaultValue: "Disponibile",
            },
        },
        {
            sequelize,
            modelName: 'Prenotazione',
            tableName: 'prenotazione',
        }
        );
    }

    static associate() {
        Utente.hasMany(Prenotazione);
        Prenotazione.belongsTo(Utente);

        Immobile.hasMany(Prenotazione);
        Prenotazione.belongsTo(Immobile);

        Agente.hasMany(Prenotazione);
        Prenotazione.belongsTo(Agente);
    }
}
