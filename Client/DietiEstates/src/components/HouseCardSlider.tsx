import React, { useState } from "react";
import { HouseCard } from "./house_card";

const HouseCardSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array dei dati delle card
  const houses = [
    {
      title: "Villa sul mare",
      street: "Via dei mille",
      size: "40",
      bathrooms: "2",
      locals: "3",
      agentImage: "https://informatica.dieti.unina.it/images/foto-docenti/di-martino.png",
      price: "100.000€",
      images: [
        "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxG8ihFgvtyxCvoVxgoVKto6MpkCZzVwNoxA&s",
      ],
      lat: 40.826232,
      lon: 14.186043,
    },
    {
      title: "Villa sul mare",
      street: "Via dei mille",
      size: "40",
      bathrooms: "2",
      locals: "3",
      agentImage: "https://informatica.dieti.unina.it/images/foto-docenti/di-martino.png",
      price: "200.000€",
      images: [
        "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxG8ihFgvtyxCvoVxgoVKto6MpkCZzVwNoxA&s",
      ],
      lat: 40.826232,
      lon: 14.186043,
    },
    {
      title: "Villa sul mare",
      street: "Via dei mille",
      size: "40",
      bathrooms: "2",
      locals: "3",
      agentImage: "https://informatica.dieti.unina.it/images/foto-docenti/di-martino.png",
      price: "300.000€",
      images: [
        "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxG8ihFgvtyxCvoVxgoVKto6MpkCZzVwNoxA&s",
      ],
      lat: 40.826232,
      lon: 14.186043,
    },
  ];

  // Gestione della rotazione
  const rotateRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % houses.length);
  };

  const rotateLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + houses.length) % houses.length);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Contenitore delle card */}
      <div className="w-full h-64 flex items-center justify-center overflow-auto">
        {houses.map((house, index) => {
          // Calcolo della posizione
          const position =
            index === currentIndex
              ? "z-20 scale-75"
              : index === (currentIndex - 1 + houses.length) % houses.length
              ? "z-10 scale-50 -translate-x-full"
              : index === (currentIndex + 1) % houses.length
              ? "z-10 scale-50 translate-x-full"
              : "hidden";

          return (
            <div
              key={index}
              className={`absolute transition-all duration-500 ease-in-out transform ${position}`}
            >
              <HouseCard {...house} />
            </div>
          );
        })}
      </div>

      {/* Bottoni per la rotazione */}
      <div className="flex space-x-4">
        <button
          onClick={rotateLeft}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition"
        >
          Ruota a Sinistra
        </button>
        <button
          onClick={rotateRight}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition"
        >
          Ruota a Destra
        </button>
      </div>
    </div>
  );
};

export default HouseCardSlider;
