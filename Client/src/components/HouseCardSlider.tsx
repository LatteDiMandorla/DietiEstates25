import { useEffect, useRef, useState } from "react";
import { HouseCard } from "./house_card";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useResizeDetector } from 'react-resize-detector';
import { Immobile } from "../Interfaces/interfaces";

export const HouseCardSliderSp = ({houses} : {houses: Immobile[]}) => {
  const [selected, setSelected] = useState<number>(1);
  const itemRefs = useRef<any>([]);
  const { width, ref } = useResizeDetector<HTMLDivElement>();

  const handleScrollToId = (id: number, behavior: ScrollBehavior) => {
      if(itemRefs && itemRefs.current && itemRefs.current[id] &&  ref && ref.current){
        const scrollableWidth = ref.current.offsetWidth;
        const itemWidth = itemRefs.current[id].offsetWidth;
        const scrollOffset = itemRefs.current[id].offsetLeft + itemWidth/2 - scrollableWidth/2;
        ref.current.scrollTo({
          left: scrollOffset,
          behavior: behavior, // Scroll animato
        });
        // itemRefs.current[id].scrollIntoView({behavior, block: "center", inline: "center"});
      }
  }

  useEffect(() => {
      handleScrollToId(selected, "smooth");
  }, [selected])

  useEffect(() => {
    handleScrollToId(selected, "auto");
  }, [width])

  const selectedStyle = "scale-[115%]"

  return (
    <div className="flex items-center">
      <div className="relative">
        <div className="absolute flex items-center h-fit left-4 bg-gray-300/40 rounded-full z-30"><IoIosArrowBack className={`hover:cursor-pointer hover:text-blue-500 mr-1`} size={40} onClick={() => setSelected((selected + houses.length - 1) % houses.length)} /></div>
      </div>
      <div className="w-full px-2 py-10 overflow-x-hidden md:overflow-x-hidden overflow-y-visible no-scrollbar flex" ref={ref}>
        <div className="w-fit flex items-center h-56 md:h-64 gap-8 md:gap-12 px-32">
            {houses.map((h, i) => <div key={i} ref={(el) => (itemRefs.current[i] = el)} className={"h-full transition-all origin-center " + (selected == i && selectedStyle)}><HouseCard {...h} /></div>)}
        </div>
      </div>
      <div className="relative">
        <div className="absolute flex items-center h-fit right-4 bg-gray-300/40 rounded-full z-30"><IoIosArrowForward className={`hover:cursor-pointer hover:text-blue-500 ml-1`} size={40} onClick={() => setSelected((selected + 1) % houses.length)} /></div>
      </div>
    </div>
  )
}