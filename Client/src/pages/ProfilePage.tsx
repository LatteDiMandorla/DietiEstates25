import { MdStar } from "react-icons/md";
import { LuMessageSquareMore } from "react-icons/lu";
import { RiMapPin5Fill } from "react-icons/ri";


export const ProfilePage = () => {
    return (
        <div className="bg-white flex-1 w-full flex flex-col items-center justify-start overflow-y-scroll">
            <div className="w-full h-full flex flex-col bg-[url('https://informatica.dieti.unina.it/images/foto-docenti/di-martino.png')] bg-center bg-cover lg:items-center lg:justify-center border-b-4 border-blue-950 border-opacity-75">
                <div className="hidden lg:w-full lg:h-full lg:flex lg:flex-col lg:backdrop-blur-lg lg:items-center lg:justify-center">
                    <div className="bg-white w-[28vw] h-[28vw] max-w-[400px] max-h-[400px] rounded-full p-1.5"></div>

                </div>
                <div className="lg:hidden w-full h-1/2 flex flex-col">



                </div>

                <div className="w-full h-1/2 flex flex-row items-end justify-end lg:hidden">
                    <div className="flex flex-row items-center justify-end w-1/2 h-1/2 space-x-3 px-4">
                        <div className="rounded-full w-10 h-10 bg-blue-950 flex items-center justify-center shadow-md">
                            <LuMessageSquareMore className="w-8 h-8 text-white" />
                        </div>
                        <div className="rounded-full w-10 h-10 bg-blue-950 flex items-center justify-center shadow-md">
                            <RiMapPin5Fill className="w-6 h-6 text-white" />
                        </div>
                    </div>

                </div>


            </div>

            <div className="w-full h-1/2">
                <div className="bg-blue-950 w-full flex-1 bg-opacity-70 flex flex-col space-y-3 lg:space-y-20 p-2">
                    <div className="w-full flex flex-col items-center justify-center p-2">
                        <p className="text-white text-4xl font-serif lg:text-6xl text-center"> SERGIO DI MARTINO</p>
                        <div className="w-full flex items-center justify-center text-white">
                            <MdStar className="w-10 h-8" />
                            <MdStar className="w-10 h-8" />
                            <MdStar className="w-10 h-8" />
                            <MdStar className="w-10 h-8" />
                            <MdStar className="w-10 h-8" />
                        </div>
                    </div>


                    <div className="flex w-full items-center justify-center text-white mt-2 flex-col space-y-3">
                        <h1 className="w-11/12 lg:w-1/2 lg:h-10 text-xl lg:text-2xl underline font-bold bg-blue-600 rounded-lg text-center bg-opacity-20"> Descrizione</h1>
                        <div className=" w-11/12 lg:w-1/2 h-full text-justify lg:text-xl">
                            Ciao! Sono Sergio Di Martino, agente immobiliare con una grande passione per il mio lavoro. Da anni aiuto famiglie e professionisti a trovare la casa dei loro sogni o l’immobile perfetto per le loro esigenze. Mi piace lavorare con trasparenza e dedicare attenzione a ogni dettaglio, perché credo che ogni cliente meriti il massimo. Sul mio profilo puoi scoprire le recensioni di chi ha già lavorato con me, la mia disponibilità e tutte le proprietà che gestisco. Sono qui per rendere il tuo percorso il più semplice e soddisfacente possibile!
                        </div>
                    </div>

                    <div className="flex w-full h-full items-center justify-center flex-col space-y-2">
                        <h1 className="w-11/12 lg:w-1/2 h-10 text-white font-bold underline text-xl lg:text-2xl text-center bg-blue-600 rounded-lg bg-opacity-20"> Tutte le proprietà </h1>
                        <div className="flex w-full lg:w-1/2 h-full flex-col items-center justify-center lg:flex-row">

                            <div className="lg:block flex flex-col lg:w-1/2 h-full border border-red-950 bg-black">

                            </div>

                            <div className="flex w-1/2 h-full flex-col items-center justify-center space-y-3">


                            </div>

                        </div>


                    </div>



                </div>


                <div className="hidden bg-blue-950 bg-opacity-70 lg:w-full lg:h-full lg:flex lg:flex-col lg:items-center lg:justify-start lg:space-y-3 p-2">
                    <h1 className=" w-1/2 h-10 text-white text-2xl underline font-bold bg-blue-600 bg-opacity-20 text-center"> Recensioni </h1>

                </div>

            </div>


        </div>

    )



};
