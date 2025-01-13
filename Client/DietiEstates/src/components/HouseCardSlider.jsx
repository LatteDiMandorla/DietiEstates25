// src/components/HouseCardSlider.jsx
import React, { useState } from 'react';
import { HouseCard } from './house_card';  // Assicurati che il percorso sia corretto

function HouseCardSlider() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 3); // Ciclo tra 0, 1, 2
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % 3); // Ciclo tra 0, 1, 2
  };

  const cardClasses = (index) => {
    if (index === currentIndex) {
      return 'translate-x-0';
    }
    if (index === (currentIndex + 1) % 3) {
      return 'translate-x-96'; // spostamento verso destra
    }
    return '-translate-x-96'; // spostamento verso sinistra
  };

  return (
    <div className="relative flex justify-center items-center m-10">
      {/* Card precedente */}
      <div className={`transition-all duration-500 absolute top-0 ${cardClasses(0)}`}>
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

      {/* Card centrale */}
      <div className={`transition-all duration-500 absolute top-0 ${cardClasses(1)}`}>
        <HouseCard
          title="Villa sul mare"
          street="Via dei mille"
          size="40"
          bathrooms="2"
          locals="3"
          agentImage="https://informatica.dieti.unina.it/images/foto-docenti/di-martino.png"
          price="200.000€"
          images={["https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxG8ihFgvtyxCvoVxgoVKto6MpkCZzVwNoxA&s"]}
          lat={40.826232}
          lon={14.186043}
        />
      </div>

      {/* Card successiva */}
      <div className={`transition-all duration-500 absolute top-0 ${cardClasses(2)}`}>
        <HouseCard
          title="Villa sul mare"
          street="Via dei mille"
          size="40"
          bathrooms="2"
          locals="3"
          agentImage="https://informatica.dieti.unina.it/images/foto-docenti/di-martino.png"
          price="300.000€"
          images={["https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxG8ihFgvtyxCvoVxgoVKto6MpkCZzVwNoxA&s"]}
          lat={40.826232}
          lon={14.186043}
        />
      </div>

      {/* Bottoni per navigare tra le card */}
      <button onClick={handlePrev} className="absolute left-0 bg-gray-700 text-white p-2">Prev</button>
      <button onClick={handleNext} className="absolute right-0 bg-gray-700 text-white p-2">Next</button>
    </div>
  );
}

export default HouseCardSlider;
