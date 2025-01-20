import { useNavigate } from "react-router-dom";
import LogoImage from '../assets/DietiLogo.png'


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
                <button className="bg-red-500 w-36 h-10 rounded-md text-white hover:bg-red-600 hover:scale-95 transition-all">
                    <span>Salva ed esci</span>
                </button>
            </div>
        </div>
    );
}