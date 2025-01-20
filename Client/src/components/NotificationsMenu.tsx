import { useCallback, useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { TbBellFilled } from "react-icons/tb";
import { useMediaQuery } from 'react-responsive';
import { RiCloseFill } from "react-icons/ri";
import { Notification } from "./Notification";

export const NotificationsMenu = () => {
    const ref = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [openNotify, setOpenNotify] = useState<boolean>(false);
    const [unreaden, setUnreaden] = useState<boolean>(false);
    const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)'});
    const [isClicked, setIsClicked] = useState<boolean>(false);

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

    const getStyle = () => {
        return isSmallScreen ? "fixed left-0 top-0 h-full w-full z-[2001]" : "absolute top-2 -right-8 bottom-0 h-72 w-96 z-[2001]"
    }

    return (
        <div className="flex flex-col !font-normal">
        <button ref={buttonRef} onClick={() => {setOpenNotify(!openNotify); setUnreaden(false)}} className="relative h-fit "><TbBellFilled onClick={() => HandleRingClick()} onBlur={()=> HandleRingClick()} className={`text-blue-900 ${isClicked === true ? "animate-ring" : ""}`} size={28} /></button>
            {unreaden && <div className="top-[0.1rem] right-1 absolute bg-red-500 w-[0.6rem] h-[0.6rem] rounded-full"></div>}
            <div className="relative top-1 flex justify-end overflow-visible">
                { openNotify &&
                <>
                <div className="absolute right-[0.3rem] border-solid border-b-white border-b-8 border-x-transparent border-x-8 border-t-0 shadow-md"></div>
                <div ref={ref} className={`${getStyle()} bg-white shadow-md rounded-md hover:cursor-default p-1 overflow-y-scroll no-scrollbar `}>
                    <div className="md:hidden sticky bg-white top-0 h-12 border-b border-gray-200 flex justify-between items-center">
                        <div className="w-8" />
                        <p className="font-bold">Notifiche</p>
                        <div className="w-8"><RiCloseFill onClick={() => setOpenNotify(false)} size={32}/></div>
                    </div>
                    <div className="h-fit">
                        <Notification date={dateMsg(new Date("Jan 16, 2025 21:58:00"))} title="Ti ho rifiutato l'offerta" text="Se ci riprovi ti spacco la faccia" avatar="https://informatica.dieti.unina.it/images/foto-docenti/di-martino.png" />
                        <Notification date={dateMsg(new Date("Jan 16, 2025 10:58:00"))} title="Non ti voglio vedere" text="È inutile che insisti" avatar="https://informatica.dieti.unina.it/images/foto-docenti/di-martino.png" />
                        <Notification date={dateMsg(new Date("Jan 15, 2025 21:58:00"))} title="Hai preso 6 all'esame" text="Sei bocciato, riprova la prossima sessione" avatar="https://informatica.dieti.unina.it/images/foto-docenti/di-martino.png" />
                        <Notification date={dateMsg(new Date("Jan 01, 2025 21:58:00"))} title="Ho ricevuto la tua prenotazione" text="Buona fortuna per l'esame" avatar="https://informatica.dieti.unina.it/images/foto-docenti/di-martino.png" />
                    </div>
                </div>
                </>}
                        
            </div>
            </div>
    )
}