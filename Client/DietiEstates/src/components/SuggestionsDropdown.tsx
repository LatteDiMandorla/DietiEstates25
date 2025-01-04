import { useNavigate } from "react-router-dom";

const SuggestionsDrowdown = ({suggestions} : any) => {
    const navigate = useNavigate();
    return (
        <div className="top-6 z-20 relative">
          <div className="absolute">
            <div className="flex flex-col w-96 bg-white rounded-b-md border-y border-x shadow-xl border-gray-300">
                {suggestions.map((s : any, index: number) => (<button type="submit" className="text-left px-2" onClick={() => {localStorage.setItem("startCoordinates", JSON.stringify({lat: s.lat, lon: s.lon})); navigate(`/search/${encodeURIComponent(s.text)}`)}} key={index}>{s.text}</button>))}
            </div>
          </div>
        </div>
    )
}

export default SuggestionsDrowdown;