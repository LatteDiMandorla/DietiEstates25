import {useState} from 'react'
import { HouseCard, HouseCardSkeleton } from "../components/house_card";


export const ProfilePage = () =>
{

    {/*useState to update profile choices*/}
    const [selectedTab, setSelectedTab] = useState<string>("Recensioni")
    
    {/*Function that switch the content of a div in the profile card*/}
    const renderContent = () => 
    {
        switch (selectedTab)
        {
            case "Recensioni":
                return (
                    <div className="bg-white w-full h-full">
                       
                    </div>
                )
            case "Agenzia":
                return (
                    <div className="bg-white w-full h-full">
                       
                    </div>
                )
            case "Orari":
                return (
                    <div className="bg-white w-full h-full">
                        
                    </div>
                )
            default:
                return null;
        }
    }

    return (
        <div className="bg-white w-full h-screen flex items-center justify-between gap-5">
            <div className="bg-white w-2/4 h-full flex lg:flex-col mt-10 gap-6 shadow-md items-center"> 
                    <div className="bg-white w-3/4 h-1/2 mt-3 rounded-lg shadow-md">
                        <header className="bg-blue-200 w-full h-1/4 flex items-center rounded-t-lg">
                            <div className="bg-white w-2/12 h-3/4 rounded-full ml-4"/>
                            <div className="bg-blue-200 w-3/4 h-full ml-4 flex flex-col justify-center">
                                <h1 className="ml-3 text-xl overflow-hidden font-bold text-blue-950">
                                    NAME AND SURNAME
                                </h1>

                                {/*Insert here stars*/}
                                <h2 className="ml-3 overflow-hidden font-thin text-blue-950">
                                    POINTS
                                </h2>                       
                            </div>   
                        </header>
                        <div className="bg-white w-full h-10 border border-gray-100 flex items-center justify-start">
                            <div className="grid grid-cols-3 gap-8 ml-2">
                            <button
                                className={`${
                                    selectedTab === "Recensioni" ? "text-blue-900 underline" : "text-blue-900"
                                    } hover:underline`}
                                onClick={() => setSelectedTab("Recensioni")} >
                                            Recensioni
                            </button>
                            <button
                                className={`${
                                    selectedTab === "Agenzia" ? "text-blue-900 underline"    : "text-blue-900"
                                    } hover:underline`}
                                onClick={() => setSelectedTab("Agenzia")} >
                                            Agenzia
                            </button>
                            <button
                                className={`${
                                    selectedTab === "Orari" ? "text-blue-900 underline"      : "text-blue-900"
                                    } hover:underline`}
                                onClick={() => setSelectedTab("Orari")} >
                                            Orari
                            </button>
                            </div>

                        </div>
                        {/*This is the div that must change when a tab is selected*/}
                        <div className="h-2/3 w-full p-3">
                            {renderContent()}
                        </div>
                            
                    </div>
                    
                    {/*Div for other properties managed by the agent*/}
                    <div className="relative flex bg-white w-3/4 h-1/2 justify-center items-center">

                        <HouseCard
                            title="Villa sul mare"
                            street="Via dei mille"
                            size="40"
                            bathrooms="2"
                            locals="3"
                            agentImage="https://informatica.dieti.unina.it/images/foto-docenti/di-martino.png"
                            price="100.000€"
                            images={["https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxG8ihFgvtyxCvoVxgoVKto6MpkCZzVwNoxA&s"]}
                            lat={40.826232}
                            lon={14.186043}
                        />
        

                    </div>
            </div>

            {/*Here a map that shows where are all other properties managed by an agent*/}
            <div className="bg-white w-2/4 h-full mt-10 items-center justify-center">
               
            </div>

        </div>
    );
}