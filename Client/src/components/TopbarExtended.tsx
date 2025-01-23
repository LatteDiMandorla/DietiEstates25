import { CiMap } from "react-icons/ci"
import { FaDollarSign } from "react-icons/fa"
import { FiLifeBuoy } from "react-icons/fi"
import { LuUsersRound } from "react-icons/lu"
import { Avatar } from "./Avatar"
import SearchBar from "./SearchBar"
import { NotificationsMenu } from "./NotificationsMenu"
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import  LogoImage  from '../assets/DietiLogo.png'

export const TopbarExtended = ({shrink} : {shrink: boolean}) => {
    const {auth} = useAuth();
    const navigate = useNavigate();

    return (
        <div className={`flex flex-col w-full items-center justify-end bg-[#DDF5FF] ${shrink ? "h-28 md:h-20 py-0 gap-0"  : "h-64"} transition-all duration-300 relative`}>
            <div className={`flex w-full justify-end items-center p-2 gap-4 h-10 overflow-visible transition-all duration-200 absolute z-50 top-2 ${shrink && "opacity-100 md:opacity-100 top-1 md:top-5"} pointer-events-none`}>
                {auth ? 
                  <>
                  <div className="flex items-center z-10 pointer-events-auto"><NotificationsMenu /></div>
                  <Avatar size="md" className={`transition-all origin-center ${shrink && "scale-[65%] md:scale-100"} duration-300`} src={auth?.image || ""} />
                  </>
                  :
                  <button className="bg-blue-900 text-white px-4 py-1 rounded-full pointer-events-auto" onClick={() => navigate("/login")}>Login</button>
                }
            </div>

            {/* Secondo item (centrato) */}
            <div className={`flex w-full h-full rounded-lg absolute transition-all duration-300 pointer-events-none ${shrink ? "opacity-100 md:opacity-100 translate-x-1/2 translate-y-0 md:translate-x-0 md:translate-y-0" : "opacity-100 translate-x-1/2 translate-y-1/2"}`}>
              <div className={`flex justify-center items-center h-20 relative overflow-hidden transition-all duration-300 origin-center ${shrink ? "md:scale-75 md:right-12 translate-y-0 scale-75 bottom-2 md:bottom-0 -translate-x-1/2 md:translate-x-0 md:translate-y-0" : "-translate-y-1/2 -translate-x-1/2"}`}>
                <img src={LogoImage} alt="Logo" width="250" className="z-50" />
              </div>
            </div>

            {/* Terzo item */}
            <div className={`flex justify-center mb-3 px-1  ${shrink ? " h-12 w-full mb-4 md:w-[80%] md:px-10" : "w-full"} transition-all duration-300 z-40`}>
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