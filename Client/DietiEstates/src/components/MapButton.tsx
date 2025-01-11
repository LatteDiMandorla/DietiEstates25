import { BiMap } from "react-icons/bi";

import 'react'

export const MapButton = ({onClick} : {onClick:() => void}) => 
{

    return (
        <button 
            onClick={onClick}
            className="relative w-10 h-10 bg-blue-200 hover:bg-blue-400 rounded-full flex items-center justify-center overflow-hidden transition-colors duration-100 border border-blue-300">
            <BiMap className="text-blue-600 opacity-60 w-6 h-6" />
        </button>
    );

};

export default MapButton;