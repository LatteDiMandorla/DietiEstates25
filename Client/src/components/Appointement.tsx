import StarRating from "./StarRating";
import { BiSolidCalendar } from "react-icons/bi";
import { Calendar, Range } from 'react-date-range';
import { useEffect, useRef, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa"; // Usa react-icons per le stelle
import { IoIosCloud, IoIosSunny, IoIosPartlySunny, IoIosRainy, IoIosCloudy, IoIosSnow, IoIosThunderstorm } from "react-icons/io";
import { IoRainyOutline } from "react-icons/io5";
import { BsCloudFog2Fill } from "react-icons/bs";
import { Avatar } from "./Avatar";
import axios from "../api/axios";

export const Appointement = () => {

    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState<Date>();
    const [weather, setWeather] = useState<any>();

    const twoWeeks = 1000 * 60 * 60 * 24 * 14;

    const weatherIcons = (state: string) => {
        if(state == "sereno") return <IoIosSunny />;
        else if(state == "prevalentemente sereno") return IoIosPartlySunny;
        else if(state == "parzialmente nuvoloso") return IoIosCloudy;
        else if(state == "nuvoloso") return IoIosCloud;
        else if(state == "nebbia") return BsCloudFog2Fill;
        else if(state == "pioggia debole") return IoRainyOutline;
        else if(state == "pioggia") return IoIosRainy;
        else if(state == "neve") return IoIosSnow;
        else if(state == "temporale") return IoIosThunderstorm;
      };

    const times = [
        new Date(2025, 0, 28, 15, 30),
        new Date(2025, 0, 28, 16, 30),
        new Date(2025, 0, 28, 17),
        new Date(2025, 0, 28, 17, 30),
        new Date(2025, 0, 28, 18, 30),
        new Date(2025, 0, 28, 19),

    ]
    
    const handleAppointmentClick = () => {
        if(date && time) {
            console.log("appuntamento preso in data " + date.toLocaleDateString() +" all'ora" + time )
        }
    }

    useEffect(() => {
        const fetch = async () => {
            const {data} = await axios.post("/meteo", {dates: times, lat: 40.8762, lon: 14.5195})
            console.log(data);
            setWeather(data.map((w: any) => ({...w, icon: weatherIcons(w.state)})));
        }

        fetch();
    }, [])

    return (
        <div className="flex flex-col items-center bg-[#DDF5FF] h-fit rounded-xl p-2 w-96 relative">
            <div className="z-10 flex flex-row items-center justify-between p-1 w-full">
                <div className="flex flex-row items-center space-x-2">
                    <Avatar src="https://informatica.dieti.unina.it/images/foto-docenti/di-martino.png" size="sm" />
                    <div className="flex flex-col">
                        <span className="font-semibold"> Sergio Di Martino </span>
                        <span> Agente Immobiliare</span>
                    </div> 
                </div>
                <div className="flex space-x-2 items-center font-semibold">
                    <p>1.6</p>
                    <Rating rating={1.6} />
                </div>
            </div>

            <div className="flex justify-center bg-white rounded-t-lg w-full pt-1">
                <button onClick={handleAppointmentClick} className="flex space-x-2 items-center justify-center bg-[#65558F] text-white rounded-full shadow-md w-64 hover:bg-purple-700 px-2 py-1">
                    <BiSolidCalendar />
                    <p>Prenota un appuntamento</p>
                </button>
            </div>
            <div className="flex-1 flex-col w-full bg-white rounded-b-lg flex justify-center p-2">
                <Calendar className="" editableDateInputs onChange={item => setDate(item)} date={date} showMonthAndYearPickers={false} disabledDay={(date) => (date < new Date(Date.now() - (1000 * 60 * 60 * 24)) || date > (new Date(Date.now() + twoWeeks)))} />
                {date &&
                <div>
                    Seleziona un orario per la visita:
                    <div className="w-full overflow-y-scroll no-scrollbar">
                        <div className="flex w-fit gap-3 max-h-20">
                            {times.map((t, i) => <TimeButton key={i} temperature={weather[i].temperature} setTime={setTime} time={t} icon={weather[i].icon} selected={time?.valueOf() == t.valueOf()} />)}
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
        <button className={`overflow-hidden flex items-center space-x-2 border-2 border-blue-400 shadow-md pl-2 rounded-md  ${selected ? "bg-blue-400 text-white" : "hover:bg-blue-200"} transition-all `} onClick={() => {setTime(time)}}>
            <p className="font-semibold w-10">{time.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}</p>
            <div className="flex w-14 flex-col justify-center items-center bg-blue-400 px-2 text-white">
                {Icon && <Icon size={24} />}
                <p className="text-xs">{temperature}C</p>
            </div>
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