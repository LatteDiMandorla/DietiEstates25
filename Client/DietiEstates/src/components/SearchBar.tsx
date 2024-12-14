import Home from "../assets/Home.png";
import Search from "../assets/Search.png";
import { FiHome } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

function SearchBar() {
  return (
    <div className="flex items-center bg-white rounded-full px-4 py-2 w-full max-w-2xl shadow-md">
      <FiHome className="w-6 h-6 mr-2"/>
      <IoMdArrowDropdown className="w-6 h-6 mr-2"/>
      <input
        type="text"
        className="flex-1 border-none outline-none text-lg text-gray-800 py-2 placeholder-gray-400"
        placeholder="Dove vuoi andare a vivere?"
      />
      <IoIosSearch className="w-6 h-6 ml-2"/>  
    </div>
  );
}

export default SearchBar;

