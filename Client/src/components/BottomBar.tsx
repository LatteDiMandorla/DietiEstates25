import { IoPersonOutline } from "react-icons/io5";
import { VscHome } from "react-icons/vsc";
import { CiCirclePlus } from "react-icons/ci";
import { GoInbox } from "react-icons/go";
import { GoSearch } from "react-icons/go";

export const BottomBar = () => 
{
    return(
        <div className="bg-white border border-gray-200 w-full h-14 flex flex-row space-x-0 items-center justify-between p-6">
            <button className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-blue-800 opacity-80 hover:scale-95 hover:bg-blue-300 transition-all">
                <GoSearch className="h-8 w-8 text-opacity-90" />
            </button>

            <button className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-blue-800 opacity-80 hover:scale-95 hover:bg-blue-300 transition-all">
                <CiCirclePlus className="h-9 w-9"/>
            </button>

            <button className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-blue-800 opacity-80 hover:scale-95 hover:bg-blue-300 transition-all">
                <VscHome className="h-9 w-9" />
            </button>
            <button className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-blue-800 text-opacity-85 hover:scale-95 hover:bg-blue-300 transition-all">
                <GoInbox className="h-8 w-8" />
            </button>
            <button className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-blue-800 opacity-80 hover:scale-95 hover:bg-blue-300 transition-all">
                <IoPersonOutline className="h-8 w-8" />
            </button>
        </div>
    );
} 