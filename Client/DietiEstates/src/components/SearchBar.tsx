import { useState } from "react";
import { FiHome } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useAddressAutocomplete from "../hooks/useAddressAutocomplete";
import SuggestionsDrowdown from "./SuggestionsDropdown";

function SearchBar({text} : {text?: string}) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const {suggestions, handleInputChange} = useAddressAutocomplete();

  return (
    <>
    <form className="flex items-center bg-white rounded-full px-4 py-2 w-full max-w-2xl shadow-md">
      <FiHome className="w-6 h-6 mr-2"/>
      <IoMdArrowDropdown className="w-6 h-6 mr-2"/>
      { suggestions &&
        <SuggestionsDrowdown suggestions={suggestions} />
      }
      <input
        type="text"
        className="flex-1 border-none outline-none text-lg text-gray-800 py-2 placeholder-gray-400"
        placeholder="Dove vuoi andare a vivere?"
        defaultValue={text || ""}
        onChange={(e) => {setSearch(e.target.value); handleInputChange(e)}}
      />
      <button className="w-6 h-6 ml-2 hover:cursor-pointer" type="submit" onClick={() => {localStorage.setItem("startCoordinates", JSON.stringify({lat: suggestions[0].lat, lon: suggestions[0].lon})); navigate(`/search/${encodeURIComponent(suggestions[0].text)}`)}}><IoIosSearch size={22} /></button>
    </form>
    </>
  );
}

export default SearchBar;

