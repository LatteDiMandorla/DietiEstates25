import { useEffect, useRef, useState } from 'react';
import { HouseCardSliderSp } from '../components/HouseCardSlider';
import { TopbarExtended } from '../components/TopbarExtended';
import { Immobile } from '../Interfaces/interfaces';
import axios from '../api/axios';


const HomePage = () => {
    const ref = useRef<HTMLDivElement>(null);

    const [lastSearched, setLastSearched] = useState<Immobile[]>([]);

    useEffect(() => {
      const fetchLastSearched = async () => {
        const {data} = await axios.post("immobile/searches", {recents: JSON.parse(localStorage.getItem("recentSearch") || "[]")});
        if(data){
          setLastSearched(data);
        }
      }

      fetchLastSearched();
    }, [])

    return (
      <div className='flex flex-col h-dvh w-dvw overflow-hidden'>
        <TopbarExtended />
        <div className='w-full flex-1 py-3 bg-[#ffffff] overflow-y-scroll no-scrollbar'>
          <div className='flex flex-col w-fullz justify-start'>
            <div className='h-1' ref={ref}/>
            <Divider title='Potrebbero Piacerti' />
            <HouseCardSliderSp houses={lastSearched} />

            <Divider title='Ultime Ricerche' />
            <HouseCardSliderSp houses={lastSearched} />

            <Divider title='Piaciuti' />
            <HouseCardSliderSp houses={lastSearched} />
          </div>
        </div>
      </div>
    );
};

const Divider = ({title} : {title: string}) => {
  return (
    <div className='flex justify-center gap-4 w-full items-center px-6 lg:px-20 mt-3' >
      <div className='h-0 border border-black rounded-full flex-1'></div>
      <h1 className='font-bold'> {title} </h1>
      <div className='h-0 border border-black rounded-full flex-1'></div>
    </div>
  )
}
  
  

export default HomePage;