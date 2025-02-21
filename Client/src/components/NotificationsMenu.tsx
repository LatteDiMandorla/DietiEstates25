import { useCallback, useEffect, useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { TbBellFilled } from "react-icons/tb";
import { useMediaQuery } from 'react-responsive';
import { RiCloseFill } from "react-icons/ri";
import { Notification } from "./Notification";
import { IoIosSettings } from "react-icons/io";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Prenotazione } from "../Interfaces/interfaces";

export const NotificationsMenu = () => {
    const ref = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [openNotify, setOpenNotify] = useState<boolean>(false);
    const [unreaden, setUnreaden] = useState<boolean>(false);
    const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)'});
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [openSettings, setOpenSettings] = useState<boolean>(false);
    const axios = useAxiosPrivate();

    const [prenotazioni, setPrenotazioni] = useState<Prenotazione[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const {data} = await axios.get('/prenotazione/');
                if(data){
                    setPrenotazioni(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetch();
    }, [])

    const HandleRingClick = () => 
    {
        setIsClicked(false); 
        setTimeout(() => {
          setIsClicked(true);
        }, 10);
    };

    useClickOutside(() => {
        setOpenNotify(false);
    }, [ref, buttonRef])

    useEffect(() => {
        if(!openNotify) {
            setOpenSettings(false);
        }
    }, [openNotify])

    const dateMsg = useCallback((d: Date): string => {
        const now = new Date();
        const diffMs = now.getTime() - d.getTime();
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHours = Math.floor(diffMin / 60);
        const diffDays = Math.floor(diffHours / 24);
        const diffWeeks = Math.floor(diffDays / 7);
    
        if (diffSec < 60) return `${diffSec} second${diffSec !== 1 ? 'i' : 'o'} fa`;
        if (diffMin < 60) return `${diffMin} minut${diffMin !== 1 ? 'i' : 'o'} fa`;
        if (diffHours < 24) return `${diffHours} or${diffHours !== 1 ? 'e' : 'a'} fa`;
        if (diffDays < 7) return `${diffDays} giorn${diffDays !== 1 ? 'i' : 'o'} fa`;
        if (diffWeeks < 4) return `${diffWeeks} settiman${diffWeeks !== 1 ? 'e' : 'a'} fa`;
        
        return d.toLocaleDateString(); // Data completa se oltre un mese fa
    }, [openNotify]);

    const notificationTitle = (p: Prenotazione) => {
        if(p.stato == "Prenotata"){
            return "Hai una visita confermata il " + new Date(p.data).toLocaleDateString();
        } else if (p.stato == "Richiesta") {
            return "Hai richiesto una visita il " + new Date(p.data).toLocaleDateString();
        }
        else return "";
    }

    const getStyle = () => {
        return isSmallScreen ? "fixed left-0 top-0 h-full w-full z-[2001]" : "absolute top-2 -right-8 bottom-0 h-72 w-96 z-[2001]"
    }

    return (
        <div className="flex flex-col !font-normal z-[5000]">
        <button ref={buttonRef} onClick={() => {setOpenNotify(!openNotify); setUnreaden(false)}} className="relative h-fit "><TbBellFilled onClick={() => HandleRingClick()} onBlur={()=> HandleRingClick()} className={`text-blue-900 ${isClicked === true ? "animate-ring" : ""}`} size={28} /></button>
            {unreaden && <div className="top-[0.1rem] right-1 absolute bg-red-500 w-[0.6rem] h-[0.6rem] rounded-full"></div>}
            <div className="relative top-1 flex justify-end overflow-visible !z-[5000]">
                { openNotify &&
                <>
                <div className="absolute right-[0.3rem] border-solid border-b-white border-b-8 border-x-transparent border-x-8 border-t-0 shadow-md"></div>
                <div ref={ref} className={`${getStyle()} bg-white shadow-md rounded-md hover:cursor-default px-1 overflow-y-scroll no-scrollbar `}>
                    <div className="sticky bg-white top-0 h-12 border-b border-gray-200 flex justify-between items-center">
                        <div className="w-8"><IoIosSettings onClick={() => setOpenSettings(true)} size={32} /></div>
                        <p className="font-bold">Notifiche</p>
                        <div className="w-8"><RiCloseFill onClick={() => setOpenNotify(false)} size={32}/></div>
                    </div>
                    {
                    !openSettings ?    
                    <div className="h-fit">
                        {prenotazioni?.map((p) => <Notification date={dateMsg(new Date(p.data))} title={"Visita"} text={notificationTitle(p)} avatar={p.Agente?.image}/>)}
                    </div>
                    :
                    <div>
                        settings
                    </div>
                    }
                </div>
                </>}
                        
            </div>
            </div>
    )
}