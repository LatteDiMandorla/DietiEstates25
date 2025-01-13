import {useState} from 'react'

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
                    <div className=''>
                        ciao!
                    </div>
                )
            case "Agenzia":

            case "Orari":

            default:
             return null;
        }
    }

    return (
        <div className="bg-white w-full h-screen flex items-center justify-between gap-5">
            <div className="bg-white w-2/4 h-full flex flex-col mt-10 gap-6 shadow-md items-center"> 
                    <div className="bg-white w-3/4 h-1/2 mt-3 rounded-lg shadow-md">
                        <header className="bg-blue-200 w-full h-1/4 flex items-center rounded-t-lg">
                            <div className="bg-white w-20 h-20 rounded-full ml-6">
            
                            </div>
                            <div className="bg-blue-200 w-3/4 h-full ml-4 flex flex-col justify-center">
                                <h1 className="ml-3 text-xl">
                                    NAME AND SURNAME
                                </h1>

                                {/*Insert here stars*/}
                                <h2 className="ml-3">
                                    POINTS
                                </h2>                       
                            </div>   
                        </header>
                        <div className="bg-white w-full h-10 border border-gray-100 flex items-center justify-start">
                            <div className="grid grid-cols-3 gap-8 ml-2">
                            <button
                                className={`${
                                    selectedTab === "Recensioni" ? "text-blue-900 font-bold underline" : "text-blue-900"
                                    } hover:underline`}
                                onClick={() => setSelectedTab("Recensioni")} >
                                            Recensioni
                            </button>
                            <button
                                className={`${
                                    selectedTab === "Agenzia" ? "text-blue-900 font-bold underline" : "text-blue-900"
                                    } hover:underline`}
                                onClick={() => setSelectedTab("Agenzia")} >
                                            Agenzia
                            </button>
                            <button
                                className={`${
                                    selectedTab === "Orari" ? "text-blue-900 font-bold underline" : "text-blue-900"
                                    } hover:underline`}
                                onClick={() => setSelectedTab("Orari")} >
                                            Orari
                            </button>
                            </div>

                        </div>
                        {/*This is the div that must change when a tab is selected*/}
                        <div className='p-6'>
                            {renderContent()}
                        </div>

                    </div>

                    <div className="bg-yellow-200 w-full h-1/2">

                    </div>
            </div>

            {/*Here a map that shows where are all other properties managed by an agent*/}
            <div className="bg-white w-2/4 h-full mt-10 items-center justify-center text-center">
                ciao
            </div>

        </div>
    );
}