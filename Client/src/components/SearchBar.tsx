import { FormEventHandler, useEffect, useLayoutEffect, useState } from "react";
import { FiHome } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAddressAutocomplete from "../hooks/useAddressAutocomplete";
import SuggestionsDrowdown from "./SuggestionsDropdown";
import { ClipLoader } from "react-spinners";
import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "../api/axios";
import UseAnimations from "react-useanimations";
import searchToX from 'react-useanimations/lib/searchToX'
import { BsHouseDoorFill } from "react-icons/bs";

function SearchBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const {suggestions, isLoading, handleInputChange} = useAddressAutocomplete();
  const [recents] = useLocalStorage<any[]>("recentSearch", []); 
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [params] = useSearchParams();
  const query = params.get("query");


  useEffect(() => {
    const fetchRecentSearches = async () => {
      const {data} = await axios.get(`/utente/recentSearches?id=1`);
      localStorage.setItem("recentSearch", JSON.stringify(data));
    }

    fetchRecentSearches()
  }, [])


  useEffect(() => {
    if(query){
      setSearch(query);
    }
  }, [query])

  useEffect(() => {
    // console.log(recents);
  }, [recents])

  const navigateToSearch = (s: any) => {
    (document.activeElement as HTMLElement).blur();
    navigate(`/search?query=${encodeURIComponent(s.text)}&lat=${s.lat}&lon=${s.lon}&zoom=13`)
    if(recents.length && !recents.filter((r) => r.text == s.text).length) {
      const recentStrg = JSON.parse(localStorage.getItem("recentSearch") || "[]");
      recentStrg.length >= 5 && recentStrg.pop();
      localStorage.setItem("recentSearch", JSON.stringify([s, ...recentStrg]));
    } else if (recents.length && s.text != recents[0].text) {
      const recentStrg = JSON.parse(localStorage.getItem("recentSearch") || "[]");
      localStorage.setItem("recentSearch", JSON.stringify([s, ...recentStrg.filter((r : any) => r.text !== s.text)]));
    }
    else if(recents.length == 0){
      localStorage.setItem("recentSearch", JSON.stringify([s]));
    }

    const saveRecentSearches = async () => {
      const recents = JSON.parse(localStorage.getItem("recentSearch") || "[]");
      await axios.post("/utente/recentSearches", {recents}, {params: {id: 1}});
    }

    saveRecentSearches();
  }

  const [isHouseClicked, setIsHouseClicked] = useState<boolean>(false)
  const HandleHouseClick = () =>
  {
      setIsHouseClicked(!isHouseClicked)
  }
  
  return (
    <div tabIndex={1} className="flex-1 group flex flex-col lg:px-10">
      <form  className="flex flex-1 items-center bg-white rounded-full px-4 py-2 shadow-md max-h-full  " onSubmit={(e) => {e.preventDefault(); ((suggestions && suggestions[0]) || (recents && recents[0])) && navigateToSearch(suggestions && suggestions[0] ? suggestions[0] : (recents && recents[0]))}}>
        <BsHouseDoorFill onClick={() => HandleHouseClick()} onBlur={() => HandleHouseClick()} className={`text-blue-900`} size={24} />
        <IoMdArrowDropdown className={`ease-in-out transition-all text-blue-900 ${isHouseClicked === true ? "rotate-180" : "rotate-0"}`} size={24}/>
        <input
          type="text"
          className="flex-1 text-lg font-semibold border-none outline-none border text-gray-800 py-2 placeholder-gray-400 h-full"
          placeholder="Dove vuoi andare a vivere?"
          value={search}
          onChange={(e) => {setSearch(e.target.value); handleInputChange(e)}}
          onClick={()=>setIsFocused(true)}
          onBlur={()=>setIsFocused(false)}
          />
        <ClipLoader loading={isLoading} size={20} />
        <button type="submit" className="w-6 h-6 ml-2"> <UseAnimations animation={searchToX} size={26} key= {isFocused ? true : false} autoplay = {isFocused} reverse= {!isFocused} speed={10} 
                
        /></button>
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

