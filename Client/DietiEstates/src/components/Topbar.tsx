import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import Logo from "../assets/Logo.svg";
import { BiBell } from "react-icons/bi";
import { useRef, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import { NotifyButton } from "./NotifyButton";
import { Avatar } from "./Avatar";

function Topbar(){
    const navigate = useNavigate();

    return(
        <div className="font-bold bg-[#DDF5FF] h-16 flex justify-between p-2 w-full z-[2000]">
            <div className="w-28 hidden md:flex hover:cursor-pointer" onClick={() => navigate("/home")}><img src={Logo} className="object-cover" /></div>
            <SearchBar />
            <div className="w-28 flex gap-2 justify-end items-center">
                <NotifyButton />
                <Avatar size="md" border src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfASqloxLbB75XhkCMkOH16en4rfH2n-BZNw&s" />
            </div>
        </div>
    )
}

export default Topbar;