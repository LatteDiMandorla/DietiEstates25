import { useEffect, useRef } from 'react';
import { HouseCardSliderSp } from '../components/HouseCardSlider';
import { TopbarExtended } from '../components/TopbarExtended';



const HomePage = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() =>{
      if(ref && ref.current){
        ref.current.scrollIntoView({behavior: "instant"});
      }
    }, [])

    return (
      <div className='flex flex-col h-dvh w-dvw overflow-hidden'>
        <TopbarExtended />
        <div className='w-full flex-1 py-3 bg-[#ffffff] overflow-y-scroll no-scrollbar'>
          <div className='flex flex-col w-fullz justify-start'>
            <div className='h-1' ref={ref}/>
            <Divider title='Potrebbero Piacerti' />
            <HouseCardSliderSp />

            <Divider title='Ultime Ricerche' />
            <HouseCardSliderSp />

            <Divider title='Piaciuti' />
            <HouseCardSliderSp />
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