import { useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { BiBell } from "react-icons/bi";
import { Avatar } from "./Avatar";
import { useMediaQuery } from 'react-responsive';
import { RiCloseFill } from "react-icons/ri";

export const NotifyButton = () => {
    const ref = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [openNotify, setOpenNotify] = useState<boolean>(false);
    const [unreaden, setUnreaden] = useState<boolean>(false);
    const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)'});

    useClickOutside(() => {
        console.log("click");
    }, [ref, buttonRef])

    const getStyle = () => {
        return isSmallScreen ? "fixed left-0 top-0 h-full w-full" : "absolute top-2 -right-8 bottom-0 h-72 w-96"
    }

    return (
        <div className="flex flex-col">
        <button ref={buttonRef} onClick={() => {setOpenNotify(!openNotify); setUnreaden(false)}} className="relative h-fit "><BiBell size={28} /></button>
            {unreaden && <div className="top-[0.1rem] right-1 absolute bg-red-500 w-[0.6rem] h-[0.6rem] rounded-full"></div>}
            <div className="relative top-1 flex justify-end overflow-visible">
                { openNotify &&
                <>
                <div className="absolute right-[0.3rem] border-solid border-b-white border-b-8 border-x-transparent border-x-8 border-t-0 shadow-md"></div>
                <div ref={ref} className={`${getStyle()} bg-white shadow-md rounded-md hover:cursor-default px-1 overflow-y-scroll no-scrollbar `}>
                    <div className="md:hidden sticky bg-white top-0 h-12 border-b border-gray-200 flex justify-between items-center">
                        <div className="w-8" />
                        <p className="font-bold">Notifiche</p>
                        <div className="w-8"><RiCloseFill onClick={() => setOpenNotify(false)} size={32}/></div>
                    </div>
                    <div className="h-fit">
                        <div className="border-b border-gray-300 h-24 flex w-full items-center px-2">
                            <Avatar src="https://informatica.dieti.unina.it/images/foto-docenti/di-martino.png" />
                            <div className="flex-1 flex flex-col items-start px-3">
                                <p className="font-bold text-lg">Ti ho rifiutato l'offerta</p>
                                <p className="font-light">Se ci riprovi ti spacco la faccia</p>
                            </div>
                        </div>
                        <div className="border-b border-gray-300 h-24 flex w-full items-center px-2">
                            <Avatar src="https://informatica.dieti.unina.it/images/foto-docenti/di-martino.png" />
                            <div className="flex-1 flex flex-col items-start px-3">
                                <p className="font-bold text-lg">Non ti voglio vedere</p>
                                <p className="font-light">È inutile che insisti</p>
                            </div>
                        </div>
                        <div className="border-b border-gray-300 h-24 flex w-full items-center px-2">
                            <Avatar src="https://informatica.dieti.unina.it/images/foto-docenti/di-martino.png" />
                            <div className="flex-1 flex flex-col items-start px-3">
                                <p className="font-bold text-lg">Hai preso 12 all'esame</p>
                                <p className="font-light w-full text-left">Sei bocciato, riprova la prossima sessione</p>
                            </div>
                        </div>
                        <div className="border-b border-gray-300 h-24 flex w-full items-center px-2">
                            <Avatar src="https://luistar.github.io/images/author.jpg" />
                            <div className="flex-1 flex flex-col items-start px-3">
                                <p className="font-bold text-lg">Ho ricevuto la tua prenotazione</p>
                                <p className="font-light w-full text-left">Buona fortuna per l'esame</p>
                            </div>
                        </div>
                        <div className="border-b border-gray-300 h-24 flex w-full items-center px-2">
                            <Avatar src="https://luistar.github.io/images/author.jpg" />
                            <div className="flex-1 flex flex-col items-start px-3">
                                <p className="font-bold text-lg">Ho ricevuto la tua prenotazione</p>
                                <p className="font-light w-full text-left">Buona fortuna per l'esame</p>
                            </div>
                        </div>
                        <div className="border-b border-gray-300 h-24 flex w-full items-center px-2">
                            <Avatar src="https://luistar.github.io/images/author.jpg" />
                            <div className="flex-1 flex flex-col items-start px-3">
                                <p className="font-bold text-lg">Ho ricevuto la tua prenotazione</p>
                                <p className="font-light w-full text-left">Buona fortuna per l'esame</p>
                            </div>
                        </div>
                        { Array.from({length: 10}).map(() => 
                        <div className="border-b border-gray-300 h-24 flex w-full items-center px-2">
                            <Avatar src="https://luistar.github.io/images/author.jpg" />
                            <div className="flex-1 flex flex-col items-start px-3">
                                <p className="font-bold text-lg">Ho ricevuto la tua prenotazione</p>
                                <p className="font-light w-full text-left">Buona fortuna per l'esame</p>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
                </>}
                        
            </div>
            </div>
    )
}