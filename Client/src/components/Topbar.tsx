import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Logo from "../assets/Logo.svg";
import { NotificationsMenu } from "./NotificationsMenu";
import { Avatar } from "./Avatar";
import useAuth from "../hooks/useAuth";

function Topbar(){
    const navigate = useNavigate();
    const {auth} = useAuth();

    return(
        <div className="font-bold bg-[#DDF5FF] h-16 flex justify-between p-2 w-full z-[2000]">
            <div className="w-28 hidden md:flex hover:cursor-pointer" onClick={() => navigate("/home")}><img src={Logo} className="object-cover" /></div>
            <SearchBar />
            <div className="w-28 flex gap-2 justify-end items-center">
                <NotificationsMenu />
                {auth?.image && <Avatar size="md" border src={auth?.image || ""} />}
            </div>
        </div>
    )
}

export default Topbar;