import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Logo from "../assets/Logo.svg";
function Topbar(){
    const navigate = useNavigate();

    return(
        <div className="font-bold bg-[#DDF5FF] h-16 flex justify-between p-2">
            <div className="w-28 hidden md:flex hover:cursor-pointer" onClick={() => navigate("/home")}><img src={Logo} className="object-cover" /></div>
            <SearchBar />
            <div className="w-28 hidden md:flex justify-end"><div className="border border-black rounded-full w-12 h-12 bg-gray-200"></div></div>
        </div>
    )
}

export default Topbar;