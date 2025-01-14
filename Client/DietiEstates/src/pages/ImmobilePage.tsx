import { useEffect, useRef, useState } from "react";
import { PicturesSlideshow } from "../components/PicturesSlideshow";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";
import useRangeCounter from "../hooks/useRangeCounter";

function ImmobilePage(){
    const [openImage, setOpenImage] = useState(false); 
    const images = [
        "https://www.cazampa.it/app/uploads/2023/09/2322506225.jpg",
        "https://zampol.it/wp-content/uploads/2023/02/Caratteristiche_del_gatto-scaled.jpg",
        "https://www.zooplus.it/magazine/wp-content/uploads/2020/05/1-4.jpg",
        "https://www.animalidacompagnia.it/wp-content/uploads/2024/04/gattino-che-miagola.jpg",
        "https://cucciolichepassione.it/wp-content/uploads/2022/03/Cuccioli-di-Gattini.png",
        "https://piripu.it/wp-content/uploads/2024/07/trovare-dei-gattini.jpg",
        "https://www.oipa.org/italia/wp-content/uploads/2024/06/napoli-gattini-soccorsi-7.jpg",
        "https://www.laryeilmondodeigattini.it/app/uploads/2021/03/determinare_eta-1024x684.jpg"
    ]
    const {counter: selected, next, prev, goto} = useRangeCounter(images.length);
    const itemRefs = useRef<any>([]); // Array di riferimenti agli elementi

    const handleScrollToId = (id: number) => {
        if(itemRefs && itemRefs.current && itemRefs.current[id]){
            itemRefs.current[id].scrollIntoView({behavior: "smooth", inline: "center"});
        }
    }

    useEffect(() => {
        console.log(selected);
        handleScrollToId(selected - 1 || 0);
    }, [selected])

    return (
        <div className="p-4 bg-[#FAFAFA] h-full w-full overflow-hidden">
            <PicturesSlideshow openPictures={() => setOpenImage(true)} images={images} />
            <div className={`absolute inset-0 bg-black/20 backdrop-blur-sm z-[150] hover:cursor-pointer ${openImage ? "block" : "hidden"}`} onClick={() => setOpenImage(false)}></div>
            <div className={`absolute inset-0 md:inset-16 bg-[#FAFAFA] z-[200] max-h-screen md:rounded-md ${openImage ? "flex flex-col" : "hidden"} overflow-hidden`}>
                <div className="h-16 w-full border-b border-gray-200 flex justify-between items-center px-4 overflow-hidden font-bold">
                    <button onClick={() => goto(0)} className={`${selected ? "visible" : "invisible"}`}><FaArrowLeft size={30} /></button>
                    Gattini belli
                    <button onClick={() => {setOpenImage(false); goto(0)}}><RiCloseFill size={40}/></button>
                </div>
                { selected ?
                <div className="flex flex-col w-full h-full">
                    <div className="flex-1 flex h-full relative justify-center items-center">
                        <div className="absolute flex items-center h-full left-4 rounded-lg"><IoIosArrowBack className="hover:cursor-pointer hover:text-blue-500" size={40} onClick={prev} /></div>
                        <div className={`h-96 overflow-hidden rounded-md mt-4 px-12`}>
                            <img className="w-full h-full object-contain" src={images[selected - 1]} />
                        </div>
                        <div className="absolute flex items-center h-full right-4 rounded-lg"><IoIosArrowForward className={`hover:cursor-pointer hover:text-blue-500`} size={40} onClick={next} /></div>
                    </div>
                    <div className="w-full flex items-center justify-center">
                        {selected}/{images.length}
                    </div>
                    <div className="bottom-0 h-36 w-full overflow-hidden no-scrollbar">
                        <div className="flex gap-6 h-full w-fit items-center px-10">
                            {images.map((url, i) => <div onClick={() => goto(i + 1)} ref={(el) => (itemRefs.current[i] = el)} className={`w-48 h-28 overflow-hidden rounded-md bg-gray-300 hover:cursor-pointer relative`} key={i}>
                                {/* <div className={`absolute inset-0 z-10 ${selected == i + 1 ? "backdrop-blur-none" : "backdrop-blur-sm"} transition-all rounded-md`}/> */}
                                <img className={`w-full h-full object-cover ${selected != i + 1 && "opacity-25"} transition-all`} src={url} />
                            </div>)}
                        </div>
                    </div>
                </div>
                :
                <div className="h-full overflow-scroll">
                    <div className="flex flex-wrap gap-2 p-2 justify-center md:justify-start " >
                        {images.map((url, i) => <div onClick={() => goto(i + 1)} className={`w-64 h-36 overflow-hidden rounded-md hover:cursor-pointer`} key={i}><img className="w-full h-full object-cover" src={url} /></div>)}
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default ImmobilePage;