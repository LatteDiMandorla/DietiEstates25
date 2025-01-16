import React, { useEffect, useRef, useState } from "react";
import { HouseCard } from "./house_card";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useResizeDetector } from 'react-resize-detector';

const HouseCardSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <div className="w-full relative h-64 flex items-center justify-center overflow-hidden">
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
              className={`absolute w-[32rem] transition-all duration-500 ease-in-out transform ${position}`}
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

export const HouseCardSliderSp = () => {
  const [selected, setSelected] = useState<number>(1);
  const itemRefs = useRef<any>([]);
  const { width, ref } = useResizeDetector<HTMLDivElement>();

  const handleScrollToId = (id: number, behavior: string) => {
      if(itemRefs && itemRefs.current && itemRefs.current[id]){
          itemRefs.current[id].scrollIntoView({behavior, block: "center", inline: "center"});
      }
  }

  useEffect(() => {
      console.log(selected);
      handleScrollToId(selected, "smooth");
  }, [selected])

  useEffect(() => {
    // handleScrollToId(selected, "auto");
  }, [width])

  const house = {
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
  }

  const selectedStyle = "scale-[115%]"

  return (
    <div className="flex items-center">
      <div className="relative">
        <div className="absolute flex items-center h-fit left-4 bg-gray-300/40 rounded-full z-30"><IoIosArrowBack className={`hover:cursor-pointer hover:text-blue-500 mr-1`} size={40} onClick={() => setSelected((selected + 15 - 1) % 15)} /></div>
      </div>
      <div className="w-full px-2 py-10 overflow-x-hidden md:overflow-x-hidden overflow-y-visible no-scrollbar flex" ref={ref}>
        <div className="w-fit flex items-center h-56 md:h-64 gap-8 md:gap-12 px-10">
            {Array.from({length: 15}).map((_, i) => <div key={i} ref={(el) => (itemRefs.current[i] = el)} className={"h-full transition-all origin-center " + (selected == i && selectedStyle)}><HouseCard {...house} /></div>)}
        </div>
      </div>
      <div className="relative">
        <div className="absolute flex items-center h-fit right-4 bg-gray-300/40 rounded-full z-30"><IoIosArrowForward className={`hover:cursor-pointer hover:text-blue-500 ml-1`} size={40} onClick={() => setSelected((selected + 1) % 15)} /></div>
      </div>
    </div>
  )
}

export default HouseCardSlider;
