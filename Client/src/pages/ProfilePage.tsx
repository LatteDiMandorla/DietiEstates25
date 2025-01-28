import { useState } from "react";
import { HouseCard } from "../components/house_card";
import { Review} from "../components/Review"
import MapComponent from "../components/MapComponent";
import axios from "../api/axios";
import { Immobile } from "../Interfaces/interfaces";
import { BottomBar } from "../components/BottomBar";
import { Avatar } from "../components/Avatar";
import { MdStar } from "react-icons/md";

import { LuMessageSquareMore } from "react-icons/lu";
import { FaHouse } from "react-icons/fa6";
import { RiMapPin5Fill } from "react-icons/ri";


export const ProfilePage = () => 
{
  const [selectedTab, setSelectedTab] = useState<string>("Recensioni");
      const [immobili, setImmobili] = useState<Immobile[]>();
      const [isLoading, setIsLoading] = useState<boolean>();
      const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const fetchImmobili = async (bounds: any) => {
    if(bounds && bounds.ne && bounds.sw){
            try {                
                setIsLoading(true);
                const { data } = await axios.get("/immobile/bounds", { params: { neLat: bounds.ne.lat, neLon: bounds.ne.lon, swLat: bounds.sw.lat, swLon: bounds.sw.lon}});
                if(data){
                    setImmobili(data);
                    setTimeout(() =>  setIsLoading(false), 1000);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }


  {/*Function to render selcted tab*/}
  const renderContent = () => 
  {
    switch (selectedTab) {
      case "Recensioni":
        return <div className="relative bg-white h-full w-full flex flex-col">
                    <button className="bg-blue-200 w-32 h-10 hover:bg-blue-400 transition-colors duration-150 rounded-md ml-2">
                        <p className="text-blue-900 text-opacity-90"> Ordina per: </p>
                    </button>
                    <div className="bg-white w-full flex flex-col gap-2">
                        <div className="h-96 w-full">
                          <Review
                            UserImage=""
                            TotalPoint={1}
                            NameAndSurname="Andrea"
                            ReviewTitle="Terrible"
                            Text="Puzzava e fumava come un turco, ha picchiato mia moglie e ha ucciso due bambini"/>
                        </div>
                        <div>
                          <Review
                            TotalPoint={5}
                            NameAndSurname="Giacomo"
                            ReviewTitle="Fantastico"
                            Text="Profumava di tabacco"/>
                        </div>
                    </div>


               </div>

      case "Agenzia":
        return <div className="bg-white w-full h-full"> ciao </div>;
      case "Orari":
        return <div className="bg-white w-full h-full"> ciao </div>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white flex-1 w-full flex flex-col items-center justify-start overflow-y-scroll">
        <div className="w-full h-1/2 flex flex-col bg-[url('https://informatica.dieti.unina.it/images/foto-docenti/di-martino.png')] bg-center bg-cover lg:items-center lg:justify-center border-b-4 border-blue-950 border-opacity-75">
          <div className="hidden lg:block lg:w-full lg:h-full lg:flex lg:flex-col lg:backdrop-blur-lg lg:items-center lg:justify-center">
          <div className="bg-white w-[28vw] h-[28vw] max-w-[400px] max-h-[400px] rounded-full p-1.5"></div>

          </div>
          <div className="lg:hidden w-full h-1/2 flex flex-col">

            

          </div>

          <div className="w-full h-1/2 flex flex-row items-end justify-end lg:hidden">
           <div className="flex flex-row items-center justify-end w-1/2 h-1/2 space-x-3 px-4">
              <div className="rounded-full w-10 h-10 bg-blue-950 flex items-center justify-center shadow-md">
                <LuMessageSquareMore className="w-8 h-8 text-white"/>
              </div>
              <div className="rounded-full w-10 h-10 bg-blue-950 flex items-center justify-center shadow-md">
                <RiMapPin5Fill className="w-6 h-6 text-white"/>
              </div>
            </div>

          </div>    
        
        
        </div>

        <div className="bg-white w-full h-1/2">
          <div className="bg-blue-950 w-full flex-1 bg-opacity-70 flex flex-col space-y-3 lg:space-y-20 p-2">
            <div className="w-full flex flex-col items-center justify-center p-2">
              <p className="text-white text-4xl font-serif lg:text-6xl text-center"> SERGIO DI MARTINO</p>
              <div className="w-full flex items-center justify-center text-white">
                <MdStar className="w-10 h-8"/>
                <MdStar className="w-10 h-8"/>
                <MdStar className="w-10 h-8"/>
                <MdStar className="w-10 h-8"/>
                <MdStar className="w-10 h-8"/>
              </div>
            </div>


            <div className="flex w-full h-full items-center justify-center text-white mt-2 flex-col space-y-3">
                <h1 className="w-11/12 lg:w-1/2 lg:h-10 text-xl lg:text-2xl underline font-bold bg-blue-600 rounded-lg text-center bg-opacity-20"> Descrizione</h1>
                <div className=" w-11/12 lg:w-1/2 h-full text-justify lg:text-xl">
                  Ciao! Sono Sergio Di Martino, agente immobiliare con una grande passione per il mio lavoro. Da anni aiuto famiglie e professionisti a trovare la casa dei loro sogni o l’immobile perfetto per le loro esigenze. Mi piace lavorare con trasparenza e dedicare attenzione a ogni dettaglio, perché credo che ogni cliente meriti il massimo. Sul mio profilo puoi scoprire le recensioni di chi ha già lavorato con me, la mia disponibilità e tutte le proprietà che gestisco. Sono qui per rendere il tuo percorso il più semplice e soddisfacente possibile!
                </div>
            </div>

            <div className="flex w-full h-1/2 items-center justify-center flex-col space-y-2 gap-2">
              <h1 className="w-11/12 lg:w-1/2 h-10  text-white font-bold underline text-xl lg:text-2xl text-center bg-blue-600 rounded-lg bg-opacity-20"> Tutte le proprietà </h1>
              <div className="flex w-full lg:w-1/2 h-full items-center justify-center lg:flex-row flex-col ">
                <div className="flex w-1/2 h-full flex-col items-center justify-center space-y-3">
                <HouseCard
                title="Villa sul mare"
                street="Via dei mille"
                size="40"
                bathrooms="2"
                locals="3"
                agentImage="https://informatica.dieti.unina.it/images/foto-docenti/di-martino.png"
                price="100.000€"
                images={[
                    "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxG8ihFgvtyxCvoVxgoVKto6MpkCZzVwNoxA&s",
                ]}
                lat={40.826232}
                lon={14.186043}
              />

              <HouseCard
                title="Villa sul mare"
                street="Via dei mille"
                size="40"
                bathrooms="2"
                locals="3"
                agentImage="https://informatica.dieti.unina.it/images/foto-docenti/di-martino.png"
                price="100.000€"
                images={[
                    "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxG8ihFgvtyxCvoVxgoVKto6MpkCZzVwNoxA&s",
                ]}
                lat={40.826232}
                lon={14.186043}
              />
              </div>

              <div className="lg:w-1/2 flex flex-col justify-center items-center">
                  <MapComponent></MapComponent>
              </div>

            </div>

            </div>

          </div>


          <div className="hidden lg:block bg-blue-950 bg-opacity-70 lg:w-full lg:h-full lg:flex lg:flex-col lg:items-center lg:justify-start lg:space-y-3 p-2">
            <h1 className=" w-1/2 h-10 text-white text-2xl underline font-bold bg-blue-600 bg-opacity-20 text-center"> Recensioni </h1>

          </div>
        </div>


    </div>
    
  )



};
