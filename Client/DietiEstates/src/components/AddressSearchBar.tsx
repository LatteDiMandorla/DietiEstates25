import axios from "../api/axios";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const AddressSearchBar = ({setCoordinates}: {setCoordinates: ({lat, lon} : {lat: number, lon: number}) => void}) => {
      const [suggestions, setSuggestions] = useState<any>([]);
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> >(); 
    
      const fetchSuggestions = async (text: string) => {
        const { data } = await axios.get("/map/autocomplete", { params: { text } });
        console.log(data);
        setSuggestions(data);
        setIsLoading(false);
      };
      
    
      // Funzione di input debounced
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        clearTimeout(timeoutId);
        setIsLoading(true);
        if (e.target.value.length < 3) {
          setIsLoading(false);
          setSuggestions([]);
        } else {
          const timeoutId = setTimeout(() => fetchSuggestions(e.target.value), 1000); 
          setTimeoutId(timeoutId);
        }
      };

    return (
    <>
        <div className="flex items-center space-x-3">
            <input onChange={handleInputChange} className="border border-red-600" placeholder="type" />
            <ClipLoader size={20} loading={isLoading} />
        </div>
        <div>
            {suggestions.map((s : any, index: number) => (<div onClick={() => setCoordinates({lat: s.lat, lon: s.lon})} key={index}>{s.text + "  " + s.lat + "  " + s.lon}</div>))}
        </div>
    </>
    )
}

export default AddressSearchBar;