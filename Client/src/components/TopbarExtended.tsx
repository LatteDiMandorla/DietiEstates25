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

export const TopbarExtended = () => {
    const {auth} = useAuth();
    return (
        <div className='flex flex-col w-full p-4 bg-[#DDF5FF]'>
            <div className='flex justify-end items-center p-2 gap-4'>
                <NotificationsMenu />
                {auth && <Avatar size="md" src={auth?.image || ""} />}
            </div>

            {/* Secondo item (centrato) */}
            <div className='flex justify-center rounded-lg py-4'>
                <img src={Logo} alt="Logo" width="250" />
            </div>

            {/* Terzo item */}
            <div className='flex justify-center'>
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