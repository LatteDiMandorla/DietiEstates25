import { BiMap } from "react-icons/bi";

import 'react'

export const MapButton = ({onClick} : {onClick:() => void}) => 
{

    return (
        <button 
            onClick={onClick}
            className="relative w-10 h-10 bg-blue-900 hover:bg-blue-400 rounded-full flex items-center justify-center overflow-hidden transition-colors duration-100">
            <BiMap className="text-white w-8 h-8" />
        </button>
    );

};

export default MapButton;