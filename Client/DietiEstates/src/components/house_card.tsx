import { FaRulerCombined } from "react-icons/fa";
import { PiToiletFill } from "react-icons/pi";
import { FaDoorOpen } from "react-icons/fa";
import { Immobile } from "../Interfaces/interfaces";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

interface ChildRef {
  pulse: () => void;
  scrollIntoView: () => void;
}

export const HouseCard = forwardRef<ChildRef, Immobile>((props: Immobile, ref) => {
    const [animate, setAnimate] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      pulse: () => setAnimate(true),
      scrollIntoView: () => divRef.current?.scrollIntoView({behavior: "smooth", block: "start"}),
    }));

    return (
      <div ref={divRef} className={"w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:cursor-pointer transition-all " + (animate && "animate-[pulse_2s_ease-in-out]")} onAnimationEnd={() => setAnimate(false)}>
        {/* Immagine di copertina */}
        <div className="relative">
          <img src={props.images[0]} alt="apartment_image" className="w-full h-52 object-cover" />
          <img src={props.agentImage} alt="User_profile_image" className="absolute top-2 right-2 w-14 h-14 object-cover rounded-full border-2 border-white shadow-lg" />
        </div>
        {/* Contenuto */}
        <div className="py-2 px-4">
          <div className="flex items-center justify-center rounded-full text-white font-semibold text-xs bg-green-500 w-fit px-1">{props.price}</div>
          <h2 className="text-lg font-bold text-gray-800">{props.title}</h2>
          <p className="text-sm text-gray-600">{props.street}</p>
          {/* Icone e dati */}
          <div className="border-b border-gray-300 mt-4 mb-2"></div>
          <div className="flex justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <FaRulerCombined />
              <span>{props.size} m²</span>
            </div>
            <div className="flex items-center space-x-1">
              <PiToiletFill />
              <span>{props.bathrooms} bagni</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaDoorOpen />
              <span>{props.locals} stanze</span>
            </div>
          </div>
        </div>
      </div>
    );
});