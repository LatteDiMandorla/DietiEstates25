import { useParams } from "react-router-dom";
import SearchBar from "./SearchBar";

function Topbar(){
    const {query} = useParams();
    return(
        <div className="font-bold bg-blue-200 h-16 flex justify-center py-2">
            <SearchBar text={query || ""} />
        </div>
    )
}

export default Topbar;