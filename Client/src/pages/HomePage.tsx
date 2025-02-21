import { useEffect, useRef, useState } from 'react';
import { HouseCardSliderSp } from '../components/HouseCardSlider';
import { TopbarExtended } from '../components/TopbarExtended';
import { Immobile } from '../Interfaces/interfaces';
import { FaPlus } from "react-icons/fa";
import axios from '../api/axios';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
    const ref = useRef<HTMLDivElement>(null);
    const {auth} = useAuth();
    const navigate = useNavigate();

    const [lastSearched, setLastSearched] = useState<Immobile[]>([]);
    const [isAtTop, setIsAtTop] = useState<boolean>(true);

    useEffect(() => {
      const fetchLastSearched = async () => {
        const {data} = await axios.post("immobile/searches", {recents: JSON.parse(localStorage.getItem("recentSearch") || "[]")});
        if(data){
          setLastSearched(data);
        }
      }

      fetchLastSearched();
    }, [])

    const handleScroll = () => {
      if(ref.current && ref.current?.scrollTop >= 10) {
        setIsAtTop(false);
      } else {
        setIsAtTop(true);
      }
    }

    return (
      <div className='flex flex-col h-dvh w-dvw overflow-hidden'>
        <TopbarExtended shrink={!isAtTop} />
        {auth?.ruolo == "AGENTE" && <button onClick={() => navigate("/inserisciimmobile")} className='w-10 h-10 shadow-sm bg-blue-600 text-white font-bold flex items-center justify-center fixed bottom-5 right-5 z-50 rounded-full'><FaPlus size={24} /></button>}
        <div ref={ref} className='w-full flex-1 bg-[#FAFAFA] overflow-y-scroll no-scrollbar' onScroll={handleScroll} onTouchMove={handleScroll}>
          <div className='flex flex-col w-fullz justify-start'>
            <Divider title='Potrebbero Piacerti' />
            <HouseCardSliderSp houses={lastSearched} />

            <Divider title='Ultime Ricerche' />
            <HouseCardSliderSp houses={lastSearched} />

            <Divider title='Piaciuti' />
            <HouseCardSliderSp houses={lastSearched} />
            <Footer />
          </div>
        </div>
      </div>
    );
};

const Divider = ({title} : {title: string}) => {
  return (
    <div className='flex justify-center gap-4 w-full items-center px-6 lg:px-20 mt-3' >
      <div className='h-0 border border-blue-900 border-opacity-80 rounded-full w-24'></div>
      <h1 className='text-blue-900 text-opacity-80 font-bold'> {title} </h1>
      <div className='h-0 border border-blue-900 border-opacity-80 rounded-full w-24'></div>
    </div>
  )
}
  
  

export default HomePage;