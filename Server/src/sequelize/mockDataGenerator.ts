import Agenzia from "./models/Agenzia";
import Prenotazione from "./models/Prenotazione";

export const generator = async () => {

    // Agenzie
    await Agenzia.truncate();
    await Agenzia.create({nome: "R-EEL ESTATE", email: "staff@reelestate.com", image: "https://res.cloudinary.com/dietiestates/image/upload/v1738429373/agenzie/e2zmgwjrhi9xdwkx4vmf.jpg", password: "12345"});
    await Agenzia.create({nome: "UnicaSa", email: "official@unicasa.uni", image: "https://res.cloudinary.com/dietiestates/image/upload/v1738429068/agenzie/yo4r7jlicp95svblkd5x.jpg", password: "abcdef"});
    await Agenzia.create({nome: "IdeAle", email: "prime@idealecasa.com", image: "https://res.cloudinary.com/dietiestates/image/upload/v1738429053/agenzie/acqnheplcmnnjmjsimxa.jpg", password: "123abc"});

    const date = [
        "2025-02-01 ",
        "2025-02-02 ",
        "2025-02-03 ",
        "2025-02-04 ",
        "2025-02-05 ",
        "2025-02-06 ",
        "2025-02-07 ",
        "2025-02-08 ",
        "2025-02-09 ",
        "2025-02-10 ",
    ]
    const orari = [
        "10:30:00",
        "11:30:00",
        "12:00:00",
        "12:30:00",
        "14:00:00",
        "14:30:00",
        "15:30:00",
        "16:00:00",
        "16:30:00",
        "17:00:00",
        "18:00:00",
    ]

    // Prenotazioni
    await Prenotazione.truncate();
    for(let i = 1; i <= 25; i++){
        for(const data of date) {
            for(const orario of orari){
                console.log(data+orario);
                await Prenotazione.create({data: data+orario, ImmobileId: i, AgenteId: 1});
            }
        }
    }

    
}