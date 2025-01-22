import { FaHeart, FaRegHeart, FaRulerCombined } from "react-icons/fa";
import { PiToiletFill } from "react-icons/pi";
import { FaDoorOpen } from "react-icons/fa";
import { Immobile } from "../Interfaces/interfaces";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";

interface ChildRef {
  pulse: () => void;
  scrollIntoView: () => void;
}

export const HouseCard = forwardRef<ChildRef, Immobile>((props: Immobile, ref) => {
    const [animate, setAnimate] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);
    const [liked, setLiked] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      pulse: () => setAnimate(true),
      scrollIntoView: () => divRef.current?.scrollIntoView({behavior: "smooth", block: "start"}),
    }));

    return (
      <div ref={divRef} className={"md:w-96 border min-h-fit h-full w-72 bg-white flex flex-col rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:cursor-pointer transition-all " + (animate && "animate-[pulse_2s_ease-in-out]")} onAnimationEnd={() => setAnimate(false)}>
        {/* Immagine di copertina */}
        <div className="relative h-32 md:h-40">
          <img src={props.images[0]} alt="apartment_image" className="w-full h-full object-cover" />
          <img src={props.agentImage} alt="User_profile_image" className="absolute top-2 right-2 w-14 h-14 object-cover rounded-full border-2 border-white shadow-lg" />
        </div>
        {/* Contenuto */}
        <div className="h-fit px-4 py-1 flex flex-col space-y-2 ">
          <div className="flex-1">
            <div className="flex w-full justify-between items-center h-4">
              <div className="flex items-center justify-center rounded-full text-white font-semibold text-xs bg-green-500 w-fit px-1">{props.price}€</div>
              {liked ? <FaHeart onClick={(e) => {e.stopPropagation(); setLiked(false)}} size={22} color="red" /> : <FaRegHeart size={22} onClick={(e) => {e.stopPropagation(); setLiked(true)}} color="gray" />}
            </div>
            <h2 className="text-sm lg:text-lg font-bold text-gray-800">{props.title}</h2>
            <p className="text-sm text-gray-600">{props.street}</p>
          </div>
          {/* Icone e dati */}
          <div className="border-b border-gray-300"></div>
          <div className="flex justify-between text-sm text-gray-600 h-5">
            <div className="flex items-center space-x-1">
              <FaRulerCombined />
              <span>{props.size} m²</span>
            </div>
            <div className="flex items-center space-x-1">
              <PiToiletFill />
              <span>{props.bathrooms} bagni</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaDoorOpen />
              <span>{props.locals} stanze</span>
            </div>
          </div>
        </div>
      </div>
    );
});

export const HouseCardSkeleton = () => {
  return (
    <div className={"md:w-96 border min-h-fit h-full w-72 bg-white flex flex-col rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:cursor-pointer transition-all "}>
    {/* Immagine di copertina */}
    <div className="relative overflow-hidden p-0 h-32 md:h-40">
      <Skeleton width={'100%'} height={'120%'} className="m-0 relative bottom-10" />
      <div className="absolute top-2 right-2 w-14 h-14 border-2 rounded-full border-white shadow-lg z-20 overflow-hidden"><Skeleton height={'100%'} width={'100%'} /></div>
    </div>
    {/* Contenuto */}
    <div className="py-2 px-4">
      <Skeleton width={"12%"}/>
      <Skeleton/>
      <Skeleton width={"50%"} height={10}/>
      {/* Icone e dati */}
      <div className="border-b border-gray-300"></div>
      <div className="flex min-h-fit justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <FaRulerCombined />
          <Skeleton width={25} className="ml-2" />
        </div>
        <div className="flex items-center space-x-1">
          <PiToiletFill />
          <Skeleton width={25} className="ml-2" />
        </div>
        <div className="flex items-center space-x-1">
          <FaDoorOpen />
          <Skeleton width={25} className="ml-2" />
        </div>
      </div>
    </div>
  </div>
  )
}