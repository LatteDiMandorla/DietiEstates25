import { FaRulerCombined } from "react-icons/fa";
import { PiToiletFill } from "react-icons/pi";
import { FaDoorOpen } from "react-icons/fa";

interface house_card_props {
    title: string;
    street: string;
    size: string;
    bathroom_number: string;
    local_number: string;
    house_image: string; 
    agent_image: string; 
    price: string;
}


export const HouseCard = (props: house_card_props) => {

    return (
      <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:cursor-pointer transition-all">
        {/* Immagine di copertina */}
        <div className="relative">
          <img src={props.house_image} alt="apartment_image" className="w-full h-48 object-cover" />
          <img src={props.agent_image} alt="User_profile_image" className="absolute top-2 right-2 w-14 h-14 object-cover rounded-full border-2 border-white shadow-lg" />
        </div>
        {/* Contenuto */}
        <div className="p-4">
          <div className="flex items-center justify-center rounded-full text-white font-semibold text-xs bg-green-500 w-fit px-1">{props.price}</div>
          <h2 className="text-lg font-bold text-gray-800">{props.title}</h2>
          <p className="text-sm text-gray-600">{props.street}</p>
          {/* Icone e dati */}
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <FaRulerCombined />
              <span>{props.size} m²</span>
            </div>
            <div className="flex items-center space-x-1">
              <PiToiletFill />
              <span>{props.bathroom_number} bagni</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaDoorOpen />
              <span>{props.local_number} stanze</span>
            </div>
          </div>
        </div>
      </div>
    );
};