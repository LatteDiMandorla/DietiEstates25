import { BiSolidCalendar } from "react-icons/bi";
import { Calendar } from 'react-date-range';
import { useEffect, useRef, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa"; // Usa react-icons per le stelle
import { IoIosCloud, IoIosSunny, IoIosPartlySunny, IoIosRainy, IoIosCloudy, IoIosSnow, IoIosThunderstorm } from "react-icons/io";
import { IoRainyOutline } from "react-icons/io5";
import { BsCloudFog2Fill } from "react-icons/bs";
import { Avatar } from "./Avatar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Agente } from "../Interfaces/interfaces";
import { toast } from "react-toastify";

export const Appointement = ({times, id, agente} : {times: Date[], id: number, agente?: Agente}) => {

    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState<Date>();
    const [weather, setWeather] = useState<any>();
    const axios = useAxiosPrivate();

    const weatherIcons = (state: string) => {
        if(state == "sereno") return IoIosSunny;
        else if(state == "prevalentemente sereno") return IoIosPartlySunny;
        else if(state == "parzialmente nuvoloso") return IoIosCloudy;
        else if(state == "nuvoloso") return IoIosCloud;
        else if(state == "nebbia") return BsCloudFog2Fill;
        else if(state == "pioggia debole") return IoRainyOutline;
        else if(state == "pioggia") return IoIosRainy;
        else if(state == "neve") return IoIosSnow;
        else if(state == "temporale") return IoIosThunderstorm;
      };

    const onDateChange = async (d: Date) => {
        setDate(d);
    }

    useEffect(() => {
        const fetch = async () => {
            const {data} = await axios.post("/meteo", {dates: times.map(t => t.toISOString()), lat: 40.8762, lon: 14.5195})
            setWeather(data.map((w: any) => ({...w, icon: weatherIcons(w.state)})));
        }

        fetch();
    }, [])

    const onClickPrenota = async () => {
        if(date && time){
            toast.promise(axios.post("/prenotazione/request", {data: time, immobileId: id}), {success: "Appuntamento richiesto", pending: "Richiesta in corso", error: "Appuntamento già preso"})
        }
    }

    const formatDate = (date: Date): string => {
        const options: Intl.DateTimeFormatOptions = {
          weekday: 'long', // Lunedì, Martedì, ecc.
          month: 'long', // gennaio, febbraio, ecc.
          day: 'numeric', // 1, 2, ecc.
          hour: '2-digit',  // Ora (09)
          minute: '2-digit',// Minuti (30)
        };
        
        return new Intl.DateTimeFormat('it-IT', options).format(date);
    }

    return (
        <div className="flex flex-col items-center bg-[#DDF5FF] h-fit rounded-xl p-2 w-96 relative">
            <div className="z-10 flex flex-row items-center justify-between p-1 w-full">
                <div className="flex flex-row items-center space-x-2">
                    <Avatar src={agente?.image ?? ""} size="sm" />
                    <div className="flex flex-col">
                        <span className="font-semibold"> {agente?.nome + " " + agente?.cognome} </span>
                        <span> Agente Immobiliare</span>
                    </div> 
                </div>
                <div className="flex space-x-2 items-center font-semibold">
                    <p>1.6</p>
                    <Rating rating={1.6} />
                </div>
            </div>

            <div className="flex flex-col items-center bg-white rounded-t-lg w-full pt-1">
                {(date && time) && <p className="font-semibold">{formatDate(time)}</p>}
                <button onClick={onClickPrenota} disabled={time ? false : true} className="flex space-x-2 items-center justify-center bg-[#65558F] disabled:text-gray-200 disabled:bg-opacity-80 text-white rounded-full shadow-md w-64 enabled:hover:bg-purple-700 px-2 py-1">
                    <BiSolidCalendar />
                    <p>Prenota ora</p>
                </button>
            </div>
            <div className="flex-1 flex-col w-full bg-white rounded-b-lg flex justify-center p-2">
                <Calendar className="" editableDateInputs onChange={onDateChange} date={date} showMonthAndYearPickers={false} disabledDay={(date) => (!times.filter(t => (t.toLocaleDateString() == date.toLocaleDateString())).length)} />
                {date && weather && weather.length &&
                <div>
                    Seleziona un orario per la visita:
                    <div className="w-full overflow-y-scroll no-scrollbar">
                        <div className="flex w-fit gap-3 max-h-20">
                            {times.map((t, i) => ({time: t, index: i})).filter((t) => (t.time.getDate() == date.getDate())).map((t, i) => <TimeButton key={i} temperature={weather[t.index]?.temperature} setTime={setTime} time={t.time} icon={weather[t.index]?.icon} selected={time?.valueOf() == t.time.valueOf()} />)}
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

const TimeButton = ({setTime, time, icon: Icon, temperature, selected} : {setTime: (time: Date) => void, time: Date, icon?: React.ComponentType<any>, selected: boolean, temperature: number}) => {
    useEffect(() => {
        console.log(selected);
    },[selected])
    return (
        <button className={`overflow-hidden flex items-center space-x-2 border-2 border-blue-400 shadow-md h-10 ${Icon ? "pl-2" : "px-2"} rounded-md  ${selected ? "bg-blue-400 text-white" : "hover:bg-blue-200"} transition-all `} onClick={() => {setTime(time)}}>
            <p className="font-semibold w-12">{time.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}</p>
            {Icon && <div className="flex w-14 flex-col justify-center items-center bg-blue-400 px-2 text-white">
                {Icon && <Icon size={24} />}
                <p className="text-xs">{temperature}C</p>
            </div>}
        </button>
    )
}

const Rating = ({rating} : {rating: number}) => {

    const ref = useRef<HTMLDivElement>(null);
    const [targetWidth, setTargetWidth] = useState<number | null>(null);
  
    useEffect(() => {
      // Calcola la larghezza del componente di riferimento dopo il rendering
      if (ref.current) {
        const width = ref.current.offsetWidth;
        setTargetWidth(rating * width / 5);
      }
    }, [rating]);

    return (
        <div className="relative h-7 w-32">
            <div className="absolute w-28 h-6">
                <div className="flex w-fit overflow-hidden" ref={ref}>
                    <div><FaRegStar color="gold" className="!stroke-[15]" size={26} /></div>
                    <div><FaRegStar color="gold" className="!stroke-[15]" size={26} /></div>
                    <div><FaRegStar color="gold" className="!stroke-[15]" size={26} /></div>
                    <div><FaRegStar color="gold" className="!stroke-[15]" size={26} /></div>
                    <div><FaRegStar color="gold" className="!stroke-[15]" size={26} /></div>
                </div>
            </div>
            { ref.current &&
            <div className="absolute w-28 h-6 z-10 ">
                <div className="flex overflow-hidden" style={{width: targetWidth || "100%" }}>
                    <div><FaStar color="gold" className="!stroke-[15]" size={26} /></div>
                    <div><FaStar color="gold" className="!stroke-[15]" size={26} /></div>
                    <div><FaStar color="gold" className="!stroke-[15]" size={26} /></div>
                    <div><FaStar color="gold" className="!stroke-[15]" size={26} /></div>
                    <div><FaStar color="gold" className="!stroke-[15]" size={26} /></div>
                </div>
            </div>
            }
        </div>
    )
}