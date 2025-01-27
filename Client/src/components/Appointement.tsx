import StarRating from "./StarRating";
import { BiSolidCalendar } from "react-icons/bi";
import { Calendar, Range } from 'react-date-range';
import { useEffect, useRef, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa"; // Usa react-icons per le stelle
import { Rect, useRect } from "react-use-rect";
import { Avatar } from "./Avatar";


export const Appointement = () => {

    const [date, setDate] = useState<Date>();
    const [time, setTime] = useState<number>();

    const twoWeeks = 1000 * 60 * 60 * 24 * 14;

    const times = [
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
    ]
    
    const handleAppointmentClick = () => {
        if(date && time) {
            console.log("appuntamento preso in data " + date.toLocaleDateString() +" all'ora" + times[time] )
        }
    }

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
                    <div className="flex gap-2 flex-wrap">
                        {Array.from({length: 10}).map((_, i) => <button className={`border border-gray-300 rounded-md w-16 px-2 ${i == time && "bg-gray-300"} `} onClick={() => setTime(i)}>{times[i]}</button>)}
                    </div>
                </div>
                }
            </div>
        </div>
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