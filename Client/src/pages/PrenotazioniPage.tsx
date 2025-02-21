import { useEffect, useState } from "react";
import { Prenotazione } from "../Interfaces/interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { HouseCard } from "../components/house_card";
import useAuth from "../hooks/useAuth";

const PrenotazioniPage = () => {
    const [prenotazioni, setPrenotazioni] = useState<Prenotazione[]>([]);
    const axios = useAxiosPrivate();

    const accept = async (index: number) => {
        try {
            await axios.post('/prenotazione/accept', {prenotazioneId: prenotazioni?.[index]?.id});
            setPrenotazioni(prenotazioni.map((prenotazione, i) => i == index ? {...prenotazione, stato: "Prenotata"} : prenotazione));
        } catch (error) {
            
        }
    }

    useEffect(() => {
        const fetch = async () => {
            const {data} = await axios.get('/prenotazione/');
            console.log("preno", data);
            if(data){
                setPrenotazioni(data);
            }
        }

        fetch();
    }, [])
    return (
        <div className="relative flex-1 w-full flex flex-col overflow-scroll no-scrollbar">
            Le tue prenotazioni:
            {prenotazioni?.map((prenotazione, index) => <PrenotazioneTab key={index} prenotazione={prenotazione} accept={() => accept(index)} />)}
        </div>
    )
}

const PrenotazioneTab = ({prenotazione, accept}: {prenotazione: Prenotazione, accept: () => void}) => {
    const {auth} = useAuth();

    const formatDate = (date: Date): string => {
        const options: Intl.DateTimeFormatOptions = {
          weekday: 'long',
          month: 'numeric', // gennaio, febbraio, ecc.
          day: 'numeric', // 1, 2, ecc.
          hour: '2-digit',  // Ora (09)
          minute: '2-digit',// Minuti (30)
        };
        
        return new Intl.DateTimeFormat('it-IT', options).format(date);
    }

    return(
        <div>
            <div className="flex flex-col md:flex-row items-center gap-2 px-2 py-1">
                {prenotazione.Immobile && <HouseCard {...prenotazione.Immobile} />}
                <div className="flex flex-col items-center">
                    <p className="font-bold">Prenotazione {prenotazione.stato}</p>
                    <p className="font-bold">{formatDate(new Date(prenotazione.data))}</p>
                    {auth?.ruolo == "AGENTE" && prenotazione.stato == "Richiesta" && 
                    <div className="flex space-x-1">
                        <button onClick={accept} className="bg-green-500 text-white font-bold w-32 px-2 py-1 rounded-full hover:bg-green-700 transition-all">Accetta</button>
                        <button className="bg-blue-500 text-white font-bold w-32 px-2 py-1 rounded-full hover:bg-blue-700 transition-all">Rirpogramma</button>
                    </div>
                    }
                </div>
            </div>
            <div className="w-full border-t border-gray-300 h-1" />
        </div>
    )
}

export default PrenotazioniPage;