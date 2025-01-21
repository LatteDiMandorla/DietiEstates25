import { setOptions } from 'leaflet';
import affitto from '../assets/AffittoPicture.png'
import vendita from '../assets/VenditaPicture.png'
import StepIndicator from '../components/StepIndicator';
import useRangeCounter from '../hooks/useRangeCounter';
import { useState } from 'react';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { IoExit } from "react-icons/io5";

export const FirstStep = () => {
  const steps = 3;
  const {counter: step, prev, next} = useRangeCounter(steps);
  const [isChoosen, setIsChoosen] = useState<string|null>(null);

  const handleOptionClick = (option: "vendita" | "affitto") => {
    setIsChoosen(option);
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col items-center border bg-white">
      {    /* Header*/     }
      <header className="py-4 shadow-md w-full">
        <div className="flex justify-center lg:justify-between items-center w-full px-3">
            <button onClick={() => (prev())}
              className="hidden lg:block text-blue-950 text-opacity-80 font-mono lg:flex flex-row items-start justify-start hover:scale-90 transition-transform">
                <FaArrowAltCircleLeft className='mt-1 text-xl text-blue-800'> </FaArrowAltCircleLeft>
               <span className="text-xl ml-2 underline font-mono"> Indietro</span>
            </button>
            <span className="text-blue-950 text-opacity-65 font-bold text-xl text-center">
                È un locale in vendita o in affitto?
            </span>
            <button onClick={() => (next())} 
              className="hidden lg:block text-blue-950 text-opacity-80 font-mono lg:flex flex-row items-start justify-start hover:scale-90 transition-transform">
                <span className="text-xl mr-2 underline font-mono"> Avanti</span> 
                <FaArrowAltCircleRight className='mt-1 text-xl text-blue-800'> </FaArrowAltCircleRight>
            </button>

        </div>
      </header>

      {/* Step indicator */}
      <div className="my-6">
        <StepIndicator selected={step} steps={steps} />
      </div>

      {/* Main option */}
      <div className="w-full h-full overflow-hidden flex space-x-6 justify-evenly p-6">

        {/* Button for "Sale" */}
        <button onBlur={() => setIsChoosen(null)} onClick={() => handleOptionClick("vendita")} className={`relative flex-1 bg-[#DDF5FF] flex justify-center items-center overflow-hidden rounded-lg shadow-lg hover:shadow-xl hover:scale-95 transition-all duration-300 hover:bg-blue-300
          ${isChoosen === "vendita" ? "scale-95 bg-blue-300" : ""}`}>
          <div className="absolute flex items-center justify-center text-blue-900 text-xl font-bold bg-white px-4 py-2 z-20 w-full h-14">
            Vendita
          </div>
          <img src={vendita} className="h-full w-full object-cover opacity-50 border" />
        </button>

        {/* Button for "Rent" */}
        <button onBlur={() => setIsChoosen(null)} onClick={() => handleOptionClick("affitto")} className={`relative flex-1 bg-[#DDF5FF] flex justify-center items-center overflow-hidden rounded-lg shadow-lg hover:shadow-xl hover:scale-95 transition-all duration-300 hover:bg-blue-300
          ${isChoosen === "affitto" ? "scale-95 bg-blue-300" : ""}`}>
          <div className="absolute flex items-center justify-center text-blue-900 text-xl font-bold bg-white px-4 py-2 z-20 w-full h-14">
            Affitto
          </div>
          <img src={affitto} className="h-full w-full object-cover opacity-50 border" />
        </button>
      </div> 

      <div className="block lg:hidden w-full h-20 bg-white border border-gray-200 shadow-xl items-center flex justify-between">
          <button
            onClick={() => {}} 
            className="flex items-center justify-center rounded-md bg-[#DDF5FF] h-10 w-14 ml-2 text-blue-900 hover:bg-blue-300 transition-all duration-300 hover:scale-90">
              <FaArrowAltCircleLeft className="w-8 h-8"></FaArrowAltCircleLeft>
          </button>
          <button 
            onClick={() => {}}
            className="flex items-center justify-center bg-red-400 rounded-full w-10 h-10 text-white hover:bg-red-500 hover:scale-95 transition-all">
            <IoExit className='w-6 h-6'/>
          </button>
          <button className="flex items-center justify-center rounded-md bg-[#DDF5FF] h-10 w-14 mr-2 text-blue-900 hover:bg-blue-300 transition-all duration-300 hover:scale-90">
              <FaArrowAltCircleRight className="w-8 h-8"></FaArrowAltCircleRight>
          </button>
      </div>
    </div>
  );
};


