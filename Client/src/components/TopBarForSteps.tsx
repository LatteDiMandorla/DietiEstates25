import { useNavigate } from "react-router-dom";
import LogoImage from '../assets/DietiLogo.png'
import { IoExit } from "react-icons/io5";


export const TopBarForSteps = () =>
{
    const navigate = useNavigate();

    return (
        <div className="font-bold bg-[#DDF5FF] h-16 flex justify-center lg:justify-between p-2 items-center">
            <div 
                className="w-full lg:w-1/2 h-full hover:cursor-pointer flex justify-center lg:justify-start items-center" 
                onClick={() => navigate("/home")}
            >
                <img src={LogoImage} className="object-cover w-40 h-full" />
            </div>
            <div className="hidden lg:flex w-1/2 h-full items-center justify-end">
          <button 
            onClick={() => {}}
            className="border border-red-600 flex items-center justify-center bg-red-400 rounded-full w-10 h-10 text-white hover:bg-red-500 hover:scale-95 transition-all">
            <IoExit className='w-6 h-6'/>
          </button>
            </div>
        </div>
    );
}