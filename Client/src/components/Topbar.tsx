import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Logo from "../assets/Logo.svg";
import { NotificationsMenu } from "./NotificationsMenu";
import { Avatar } from "./Avatar";
import useAuth from "../hooks/useAuth";
import LogoImage from '../assets/DietiLogo.png'


function Topbar(){
    const navigate = useNavigate();
    const {auth} = useAuth();

    return(
        <div className="font-bold bg-[#DDF5FF] h-16 flex justify-between p-2 w-full z-[2000]">
            <div className="w-40 h-full hidden md:flex hover:cursor-pointer" onClick={() => navigate("/home")}><img src={LogoImage} className="object-cover w-full h-full" /></div>
            <SearchBar />
            <div className="w-28 flex gap-2 justify-end items-center mr-5">
                <NotificationsMenu/>
                {auth?.image && <Avatar size="md" border src={auth?.image || ""} />}
            </div>
        </div>
    )
}

export default Topbar;