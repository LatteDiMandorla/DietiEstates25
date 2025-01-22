import { IoPersonOutline } from "react-icons/io5";
import { VscHome } from "react-icons/vsc";
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineMessage } from "react-icons/md";
import { GrFormSearch } from "react-icons/gr";

export const BottomBar = () => 
{
    return(
        <div className="bg-white border border-gray-200 w-full h-14 flex flex-row space-x-0 items-center justify-between p-6">
            <button className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-blue-800 opacity-80 hover:scale-95 hover:bg-blue-300 transition-all">
                <GrFormSearch className="h-11 w-11" />
            </button>

            <button className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-blue-800 opacity-80 hover:scale-95 hover:bg-blue-300 transition-all">
                <CiCirclePlus className="h-9 w-9"/>
            </button>

            <button className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-blue-800 opacity-80 hover:scale-95 hover:bg-blue-300 transition-all">
                <VscHome className="h-9 w-9" />
            </button>
            <button className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-blue-800 opacity-80 hover:scale-95 hover:bg-blue-300 transition-all">
                <MdOutlineMessage className="h-9 w-9" />
            </button>
            <button className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-blue-800 opacity-80 hover:scale-95 hover:bg-blue-300 transition-all">
                <IoPersonOutline className="h-9 w-9" />
            </button>
        </div>
    );
} 