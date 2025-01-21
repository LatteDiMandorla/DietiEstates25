import { CiMap } from "react-icons/ci"
import { FaDollarSign } from "react-icons/fa"
import { FiLifeBuoy } from "react-icons/fi"
import { LuUsersRound } from "react-icons/lu"
import { Avatar } from "./Avatar"
import Logo from "../assets/Logo.svg";
import SearchBar from "./SearchBar"
import { NotificationsMenu } from "./NotificationsMenu"
import useAuth from "../hooks/useAuth"
import { Link } from "react-router-dom"
import  LogoImage  from '../assets/DietiLogo.png'
import { useEffect, useState } from "react"



export const TopbarExtended = ({shrink} : {shrink: boolean}) => {
    const {auth} = useAuth();

    return (
        <div className={`flex flex-col w-full items-center justify-end bg-[#DDF5FF] ${shrink ? "h-20 py-0 gap-0"  : "h-64"} transition-all duration-300 relative -z-10`}>
            <div className={`flex w-full justify-end p-1 gap-8 transition-all duration-200 absolute top-2 ${shrink && "opacity-0 md:opacity-100"} -z-10`}>
                <div className="h-16 flex items-center"><NotificationsMenu /></div>
                {auth && <Avatar size="md" src={auth?.image || ""} />}
            </div>

            {/* Secondo item (centrato) */}
            <div className={`flex w-full h-full rounded-lg absolute transition-all duration-300 ${shrink ? "opacity-0 md:opacity-100 translate-x-1/2 translate-y-1/2 md:translate-x-0 md:translate-y-0" : "opacity-100 translate-x-1/2 translate-y-1/2"} -z-10`}>
              <div className={`flex justify-center items-center h-20 relative overflow-hidden transition-all duration-300 origin-center ${shrink ? "md:scale-75 md:right-12 -translate-y-1/2 -translate-x-1/2 md:translate-x-0 md:translate-y-0" : "-translate-y-1/2 -translate-x-1/2"}`}>
                <img src={LogoImage} alt="Logo" width="250" />
              </div>
            </div>

            {/* Terzo item */}
            <div className={`flex justify-center mb-3 px-1  ${shrink ? " h-12 w-full md:w-[80%] md:px-10" : "w-full"} transition-all duration-300`}>
                <SearchBar />
            </div>
        </div>
    )
}

const LinkList = () => {
    return (
        <div className='flex gap-[35px]'>
        <div className='flex gap-1 items-center'>
          <LuUsersRound />
          <a href="https://www.figma.com/design/tC6dsyQ5RcepE4GKWLuStq/Mockup-DietiEstate?node-id=130-534&node-type=rounded_rectangle&m=dev" style={{ color: 'rgba(24, 39, 75, 0.72)' }}>Agenzie</a>
        </div>

        <div className='flex gap-1 items-center'>
          <FaDollarSign />
          <a href="https://www.figma.com/design/tC6dsyQ5RcepE4GKWLuStq/Mockup-DietiEstate?node-id=130-534&node-type=rounded_rectangle&m=dev" style={{ color: 'rgba(24, 39, 75, 0.72)' }}>Mutuo</a>
        </div>

        <div className='flex gap-1 items-center'>
          <CiMap />
          <a href="https://www.figma.com/design/tC6dsyQ5RcepE4GKWLuStq/Mockup-DietiEstate?node-id=130-534&node-type=rounded_rectangle&m=dev" style={{ color: 'rgba(24, 39, 75, 0.72)' }}>Mappa</a>
        </div>

        <div className='flex gap-1 items-center'>
          <FiLifeBuoy />
          <a href="https://www.figma.com/design/tC6dsyQ5RcepE4GKWLuStq/Mockup-DietiEstate?node-id=130-534&node-type=rounded_rectangle&m=dev" style={{ color: 'rgba(24, 39, 75, 0.72)', whiteSpace: 'nowrap' }}>Fatti Guidare</a>
        </div>
      </div>
    )
}