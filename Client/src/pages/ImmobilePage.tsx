import { useState } from "react";
import { PicturesSlideshow } from "../components/PicturesSlideshow";
import useRangeCounter from "../hooks/useRangeCounter";
import { PictureListPopover } from "../components/PictureListPopover";
import { Outlet } from "react-router-dom";
import TopbarImmobile from "../components/TopBarImmobile";

import { CiFlag1 } from "react-icons/ci";
import { FaRegEyeSlash } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";

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

    const handleImageClick = (imgIndex: number, pos: number) => {
        setOpenImage(true);
        if(pos == 1 || pos == 2 || pos == 3) {
            goto(0)
        } else {
            goto(imgIndex + 1);
        }
    }


    return (
        <div className="flex flex-col w-full h-full">
            <TopbarImmobile />
            <div className="font-bold bg-[#FFFFFF] h-16 flex items-center p-2 w-full z-[100] shadow-[0px_4px_10px_rgba(0,0,0,0.25)] space-x-16">
            {/* Icona */}
            <FaArrowLeft />

            {/* Primo div: dettagli */}
            <div className="flex flex-col"> 
                <span> $300.000 </span>
                <div className="flex flex-row space-x-4">
                    <span> 100 m² </span>
                    <span> 2 locali </span>
                    <span> 2 bagni </span>
                </div>
            </div>

            {/* Linea verticale divisoria */}
            <div className="h-full w-[2px] bg-gray-300"></div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col"> 
                    <span> Villa con Giardino </span>
                    <span> Via Giuseppe Garibaldi </span>
                </div>
                <div className="flex flex-row items-center">
                    <div className="h-full w-[2px] bg-gray-300"></div>
                    <CiFlag1 />
                    <CiHeart />
                    <FaRegEyeSlash />
                </div>
            </div>
            </div>

            <div className="p-4 bg-[#FAFAFA] h-full w-full overflow-hidden">
            <PicturesSlideshow openPictures={handleImageClick} images={images} className="mx-auto md:mx-0" />
            <PictureListPopover images={images} selected={selected} next={next} prev={prev} goto={goto} open={openImage} close={() => setOpenImage(false)} />
            </div>
        </div>
    )
}

export default ImmobilePage;