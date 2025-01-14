import { useState } from "react";
import { HouseCard } from "../components/house_card";

export const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Recensioni");

  const renderContent = () => {
    switch (selectedTab) {
      case "Recensioni":
        return <div className="bg-white w-full h-full">Recensioni Content</div>;
      case "Agenzia":
        return <div className="bg-white w-full h-full">Agenzia Content</div>;
      case "Orari":
        return <div className="bg-white w-full h-full">Orari Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white w-full h-screen flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between gap-5 p-4">

      <div className="bg-white w-full lg:w-2/4 h-full lg:h-full flex flex-col lg:flex-col gap-6 items-center shadow-md">
        <div className="bg-white w-full lg:w-3/4 h-full lg:h-1/2 rounded-lg shadow-md">
          <header className="bg-blue-200 w-full h-28 flex items-center rounded-t-lg p-4">
            <div className="bg-white w-16 h-16 rounded-full"></div>
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
          <div className="h-auto w-full p-3">{renderContent()}</div>
        </div>

        {/* All properties managed by a particular agent */}
        <div className="relative bg-white w-full lg:w-3/4 h-auto flex flex-col justify-center items-center">
                <div className="bg-blue-200 w-full h-auto text-center">
                    <p> Tutte le proprietà </p>
                </div>
          
          <div className="mt-4">

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
      </div>

      {/* Mao */}
      <div className="bg-white w-full lg:w-2/4 h-auto lg:h-full items-center justify-center shadow-md hidden lg:flex">
        <div>
            ciao
        </div>
      </div>
    </div>
  );
};