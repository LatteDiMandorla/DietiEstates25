import { useNavigate } from "react-router-dom";

const SuggestionsDrowdown = ({suggestions, className = "", setText} : any) => {
    const navigate = useNavigate();
    return (
        <div className={"z-20 relative hidden " + className}>
          <div className="absolute">
            <div className="flex flex-col w-96 bg-white rounded-b-md border-y border-x shadow-xl border-gray-300">
                {suggestions.map((s : any, index: number) => (<button type="submit" className="text-left px-2" onClick={() => {setText(s.text); navigate(`/search?query=${encodeURIComponent(s.text)}&lat=${s.lat}&lon=${s.lon}&zoom=13`)}} key={index}>{s.text}</button>))}
            </div>
          </div>
        </div>
    )
}

export default SuggestionsDrowdown;