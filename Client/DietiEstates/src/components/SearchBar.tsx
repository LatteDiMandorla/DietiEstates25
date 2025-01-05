import { useEffect, useState } from "react";
import { FiHome } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAddressAutocomplete from "../hooks/useAddressAutocomplete";
import SuggestionsDrowdown from "./SuggestionsDropdown";
import { ClipLoader } from "react-spinners";

function SearchBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const {suggestions, isLoading, handleInputChange} = useAddressAutocomplete();

  const [params] = useSearchParams();
  const query = params.get("query");

  useEffect(() => {
    if(query){
      setSearch(query);
    }
  }, [query])

  return (
    <div tabIndex={1} className="group md:w-2/3 w-full ">
      <form  className="flex items-center bg-white rounded-full px-4 py-2 w-full shadow-md max-h-full  " onSubmit={(e) => {e.preventDefault(); (document.activeElement as HTMLElement).blur()}}>
        <FiHome className="w-6 h-6 mr-2"/>
        <IoMdArrowDropdown className="w-6 h-6 mr-2"/>
        <input
          type="text"
          className="flex-1 text-lg font-semibold border-none outline-none text-gray-800 py-2 placeholder-gray-400 h-full"
          placeholder="Dove vuoi andare a vivere?"
          value={search}
          onChange={(e) => {setSearch(e.target.value); handleInputChange(e)}}
          />
        <ClipLoader loading={isLoading} size={20} />
        {(search) ? 
          <button className="w-6 h-6 ml-2 hover:cursor-pointer" type="submit" onClick={() => {setSearch(""); navigate("/search")}}>X</button>
          :
          <button className="w-6 h-6 ml-2 hover:cursor-pointer" onClick={() => {navigate(`/search?query=${encodeURIComponent(suggestions[0].text)}&lat=${suggestions[0].lat}&lon=${suggestions[0].lon}`)}}><IoIosSearch size={22} /></button>
        }
      </form>
      { suggestions && suggestions.length > 0 &&
        <SuggestionsDrowdown suggestions={suggestions} className={"group-focus-within:block"} setText={setSearch} />
      }
    </div>
  );
}

export default SearchBar;

