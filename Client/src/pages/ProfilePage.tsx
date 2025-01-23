import { useState } from "react";
import { HouseCard } from "../components/house_card";
import { Review} from "../components/Review"
import MapComponent from "../components/MapComponent";
import axios from "../api/axios";
import { Immobile } from "../Interfaces/interfaces";
import { BottomBar } from "../components/BottomBar";



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
    <div className="bg-white overflow-hidden flex-1 w-full flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between">
      <div className="bg-white w-full lg:w-2/4 flex flex-col gap-4 items-center mt-3 overflow-y-scroll h-full justify-start">
        <div className="bg-white border lg:w-3/4 w-11/12 h-3/4 lg:h-3/4 rounded-lg shadow-md flex flex-col max-h-[32rem] mt-5">
          <header className="bg-blue-300 bg-opacity-85 w-full h-18 flex items-center rounded-t-lg p-3">
            <div className="bg-white w-24 h-24 rounded-full"></div>
            <div className="ml-4 flex flex-col justify-center">
              <h1 className="text-xl font-bold text-blue-950">
                NAME AND SURNAME
              </h1>
              <h2 className="font-thin text-blue-950">POINTS</h2>
            </div>
          </header>
          <div className="bg-white w-full h-10 border border-gray-100 flex items-center justify-start">
            <div className="grid grid-cols-3 gap-4 ml-2">
              <button
                className={`${
                  selectedTab === "Recensioni"
                    ? "text-blue-900 underline"
                    : "text-blue-900"
                } hover:underline`}
                onClick={() => setSelectedTab("Recensioni")}
              >
                Recensioni
              </button>
              <button
                className={`${
                  selectedTab === "Agenzia"
                    ? "text-blue-900 underline"
                    : "text-blue-900"
                } hover:underline`}
                onClick={() => setSelectedTab("Agenzia")}
              >
                Agenzia
              </button>
              <button
                className={`${
                  selectedTab === "Orari" ? "text-blue-900 underline" : "text-blue-900"
                } hover:underline`}
                onClick={() => setSelectedTab("Orari")}
              >
                Orari
              </button>
             
            </div>
            
          </div>

          <div className="flex-1 w-full p-3 overflow-y-scroll no-scrollbar">{renderContent()}</div>
        </div>
        
        {/* All properties managed by a particular agent */}
          
          <div className="bg-white lg:w-5/6 md:w-full w-full min-h-screen flex flex-col flex-1 items-center space-y-4 p-5">
            <div className="bg-blue-200 w-full h-10">
              <h1 className="text-center text-blue-900 text-xl">
                Tutte le proprietà
              </h1>
            </div>
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

        </div>


      {/* Map */}
      <div className="bg-white w-full lg:w-2/4 h-full lg:h-full items-center justify-center hidden lg:flex border-l lg:flex-col border-gray-100">
        <div className="bg-white w-full h-full p-4">
          <MapComponent className="shadow-sm px-4 py-3 rounded-lg" onMove={fetchImmobili}/>
        </div>
      </div>

      <div className="bg-white w-full lg:hidden fixed bottom-0 left-0 z-20">
            <BottomBar></BottomBar>
          </div>


    </div>
  )
};