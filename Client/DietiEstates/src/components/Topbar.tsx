import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "./SearchBar";
import Logo from "../assets/Logo.png"
function Topbar(){
    const {query} = useParams();
    const navigate = useNavigate();
    return(
        <div className="font-bold bg-[#DDF5FF] h-16 flex justify-between p-2">
            <div className="w-28 hover:cursor-pointer" onClick={() => navigate("/home")}><img src={Logo} className="object-cover" /></div>
            <SearchBar text={decodeURIComponent(query || "")} />
            <div className="w-28 flex justify-end"><div className="border border-black rounded-full w-12 h-12 bg-gray-200"></div></div>
        </div>
    )
}

export default Topbar;