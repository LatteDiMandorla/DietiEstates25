import SearchBar from '../components/SearchBar';
import { LuUsersRound } from "react-icons/lu";
import { FaDollarSign } from "react-icons/fa";
import { CiMap } from "react-icons/ci";
import { FiLifeBuoy } from "react-icons/fi";
import Logo from "../assets/Logo.png";
import Avatar from "../assets/Avatar.png";
import { FaRegBell } from "react-icons/fa";


const HomePage = () => {
  
    return (
      <div className='flex flex-col w-full p-5 bg-[#DDF5FF] '>
        {/* Primo item */}
        <div className='flex justify-between items-center p-2.5 mb-2.5 rounded-lg'>
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
              <a href="https://www.figma.com/design/tC6dsyQ5RcepE4GKWLuStq/Mockup-DietiEstate?node-id=130-534&node-type=rounded_rectangle&m=dev" style={{ color: 'rgba(24, 39, 75, 0.72)', whiteSpace: 'nowrap'}}>Fatti Guidare</a>
            </div>
          </div>
            
          <div className='flex gap-3.5 pr-1'>
            <FaRegBell size={30}/>
            <img src={Avatar} alt="Avatar" width="30" height="30" />
          </div>
        </div>
  
        {/* Secondo item (centrato) */}
        <div className='flex justify-center p-2.5 rounded-lg mb-2.5'>
          <img src={Logo} alt="Logo" width="200" />
        </div>
  
        {/* Terzo item */}
        <div className='flex justify-center'>
          <SearchBar /> {/* Rimpiazzato con il nuovo componente */}
        </div>
      </div>
    );
};
  
  

export default HomePage;