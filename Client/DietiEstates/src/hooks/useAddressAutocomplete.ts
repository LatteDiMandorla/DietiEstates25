import axios from "axios";
import { useState } from "react";

const useAddressAutocomplete = () => {
    const [suggestions, setSuggestions] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> >(); 
  
    const fetchSuggestions = async (text: string) => {
      const { data } = await axios.get("http://localhost:3000/map/autocomplete", { params: { text, lang: navigator.language || "en" } });
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

    return {suggestions, isLoading, handleInputChange};
}

export default useAddressAutocomplete;