import { FormEventHandler, useEffect, useState } from "react";
import { FiHome } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAddressAutocomplete from "../hooks/useAddressAutocomplete";
import SuggestionsDrowdown from "./SuggestionsDropdown";
import { ClipLoader } from "react-spinners";
import { useLocalStorage } from "@uidotdev/usehooks";

function SearchBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const {suggestions, isLoading, handleInputChange} = useAddressAutocomplete();
  const [recents] = useLocalStorage<any[]>("recentSearch", []); 

  const [params] = useSearchParams();
  const query = params.get("query");

  useEffect(() => {
    if(query){
      setSearch(query);
    }
  }, [query])

  useEffect(() => {
    console.log(recents);
  }, [recents])

  const navigateToSearch = (s: any) => {
    (document.activeElement as HTMLElement).blur();
    navigate(`/search?query=${encodeURIComponent(s.text)}&lat=${s.lat}&lon=${s.lon}&zoom=13`)
    if(recents && recents[0] && s.text != recents[0].text && s.lat != recents[0].lat && s.lon != recents[0].lon) {
      const recentStrg = JSON.parse(localStorage.getItem("recentSearch") || "[]");
      recentStrg.length >= 3 && recentStrg.pop();
      localStorage.setItem("recentSearch", JSON.stringify([s, ...recentStrg]));
    } else {
      localStorage.setItem("recentSearch", JSON.stringify([s]));
    }
  }

  return (
    <div tabIndex={1} className="flex-1 group flex flex-col lg:px-10">
      <form  className="flex flex-1 items-center bg-white rounded-full px-4 py-2 shadow-md max-h-full  " onSubmit={(e) => {e.preventDefault(); ((suggestions && suggestions[0]) || (recents && recents[0])) && navigateToSearch(suggestions && suggestions[0] ? suggestions[0] : (recents && recents[0]))}}>
        <FiHome size={24} />
        <IoMdArrowDropdown size={24}/>
        <input
          type="text"
          className="flex-1 text-lg font-semibold border-none outline-none border text-gray-800 py-2 placeholder-gray-400 h-full"
          placeholder="Dove vuoi andare a vivere?"
          value={search}
          onChange={(e) => {setSearch(e.target.value); handleInputChange(e)}}
          />
        <ClipLoader loading={isLoading} size={20} />
        <button type="submit" className="w-6 h-6 ml-2 hover:cursor-pointer"><IoIosSearch size={22} /></button>
      </form>
      { suggestions && suggestions.length > 0 ?
        <SuggestionsDrowdown suggestions={suggestions} className={"group-focus-within:block left-12"} setText={setSearch} onClick={(s: any) => navigateToSearch(s)} />
        : recents &&
        <SuggestionsDrowdown suggestions={recents} className={"group-focus-within:block left-12"} setText={setSearch} onClick={(s: any) => navigateToSearch(s)} title="Recenti" />
      }
    </div>
  );
}

export default SearchBar;

