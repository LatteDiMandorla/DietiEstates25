import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { NotificationsMenu } from "./NotificationsMenu";
import { Avatar } from "./Avatar";
import useAuth from "../hooks/useAuth";
import LogoImage from '../assets/DietiLogo.png'


function Topbar(){
    const navigate = useNavigate();
    const {auth} = useAuth();

    return(
        <div className={`flex flex-col w-full items-center justify-end bg-[#DDF5FF] h-28 md:h-20 py-0 gap-0 transition-all duration-300 relative z-[5000]`}>
            <div className={`flex w-full justify-end items-center p-2 gap-4 h-10 overflow-visible transition-all duration-200 absolute z-50 opacity-100 md:opacity-100 top-1 md:top-5 pointer-events-none`}>
                <div className="flex items-center z-10 pointer-events-auto"><NotificationsMenu /></div>
                {auth && <Avatar onClick={() => navigate("/self")} size="md" className={`transition-all origin-center pointer-events-auto scale-[65%] md:scale-100 duration-300`} src={auth?.image || ""} />}
            </div>

            {/* Secondo item (centrato) */}
            <div className={`flex w-full h-full rounded-lg absolute transition-all duration-300 pointer-events-none opacity-100 md:opacity-100 translate-x-1/2 translate-y-0 md:translate-x-0 md:translate-y-0`}>
              <div className={`flex justify-center items-center h-20 relative overflow-hidden transition-all duration-300 origin-center md:scale-75 md:right-12 translate-y-0 scale-75 bottom-2 md:bottom-0 -translate-x-1/2 md:translate-x-0 md:translate-y-0`}>
                <img src={LogoImage} alt="Logo" width="250" className="z-50 hover:cursor-pointer pointer-events-auto" onClick={() => navigate("/home")} />
              </div>
            </div>

            {/* Terzo item */}
            <div className={`flex justify-center px-1  h-12 w-full mb-4 md:w-[80%] md:px-10 transition-all duration-300 z-40`}>
                <SearchBar />
            </div>
        </div>
    )
}

export default Topbar;