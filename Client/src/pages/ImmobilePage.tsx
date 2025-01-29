import { useEffect, useState } from "react";
import { PicturesSlideshow } from "../components/PicturesSlideshow";
import useRangeCounter from "../hooks/useRangeCounter";
import { PictureListPopover } from "../components/PictureListPopover";

import { CiFlag1 } from "react-icons/ci";
import { FaDoorOpen, FaRegEyeSlash, FaRulerCombined } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import {Appointement} from "../components/Appointement";
import { EnergyEffiency } from "../components/EnergyEfficiency";
import { Immobile } from "../Interfaces/interfaces";
import axios from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { PiToiletFill } from "react-icons/pi";
import MapComponent from "../components/MapComponent";
import { PicturesSlideshowUploader } from "../components/PicturesSlideshowUploader";

function ImmobilePage(){
    const [immobile, setImmobile] = useState<Immobile>();
    const [img, setImg] = useState<string>();
    const {id} = useParams();
    const [file, setFile] = useState<File | null>(null);
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

    useEffect(() => {
        const fetch = async () => {
            if(id) {
                const {data} = await axios.get(`immobile/${id}`);
                if(data) {
                    setImmobile(data);
                    console.log(data);
                }
            }
        }

        fetch();
    }, [id])

    const uploadImage = async () => {
        if (!file) return;
        console.log(file);

        const formData = new FormData();
        formData.append('file', file);
        const { data } = await axios.post("/immobile", formData);
        console.log(data);
        setImg(data.url);
    }


    return (
    <>
    {immobile && <InformationTopBar {...immobile}  />}    
    <div className="w-full flex-1 overflow-y-scroll no-scrollbar flex p-2 bg-[#FAFAFA]">
        <div className="flex flex-col flex-1 h-fit gap-4 p-2">
            <div className="p-4 w-full flex justify-center">
                { immobile && immobile.images && immobile.images.length && 
                <>
                <PicturesSlideshow openPictures={handleImageClick} images={immobile.images} className="mx-auto md:mx-0" />
                <PictureListPopover images={immobile.images} selected={selected} next={next} prev={prev} goto={goto} open={openImage} close={() => setOpenImage(false)} />
                </>}
            </div>
            <div className="w-full p-2 border-t border-gray-400">
                <p className="text-lg font-semibold">Descrizione:</p>
                <p className="text-wrap break-words whitespace-pre-wrap">
                    {"Casa in uno dei quartieri più malfamati di Milano.\nSconsiglio vivamente di vivere qui\nParola di Sergio\nS.D.M."}
                </p>
            </div>
            <div className="w-full p-2 border-t border-gray-400">
                <p className="text-lg font-semibold">Caratteristiche:</p>
                <p className="text-wrap break-words whitespace-pre-wrap">
                    {"Giardino\nVicino alla Scuola\nLuminosa"}
                </p>
            </div>
            <div className="w-full p-4 border-t border-gray-400">
                <p className="text-lg font-semibold">Efficienza Energetica:</p>
                <p className="text-wrap break-words whitespace-pre-wrap">
                    {"Giardino\nVicino alla Scuola\nLuminosa"}
                </p>
            </div>
            <div className="w-full h-96 p-2 border-t border-gray-400">
                {immobile && <MapComponent markers={[{...immobile, text: ""}]} coordinates={(immobile.lat && immobile.lon) ? {lat: immobile?.lat, lon: immobile?.lon} : undefined} />}
            </div>
        </div>
        <div className="h-full w-fit sticky top-0 hidden lg:block">
            <Appointement/>
        </div>
    </div>
    </>
    )
}

export default ImmobilePage;

const InformationTopBar = ({price, locals, size, bathrooms, title, street} : Immobile) => {
    const navigate = useNavigate();
    return (
        <div className="bg-[#FFFFFF] h-16 flex items-center w-full z-[100] shadow-md">
            <div className="flex items-center h-full flex-1 md:flex-none px-4 gap-4 border-r border-gray-400">
                <FaArrowLeft className="hover:cursor-pointer" onClick={() => navigate(-1)} />
                <div className="flex flex-col"> 
                    <span className="text-lg font-semibold"> ${price} </span>
                    <div className="flex flex-row space-x-4 text-gray-400">
                        <span className="flex gap-2 items-center"> <FaRulerCombined className="text-gray-400" /> {size} m² </span>
                        <span className="flex gap-2 items-center"> <PiToiletFill /> {locals} locali </span>
                        <span className="flex gap-2 items-center"> <FaDoorOpen /> {bathrooms} bagni </span>
                                      
                                      
                                      
                    </div>
                </div>
            </div>
            
            <div className="px-8 h-full flex-row flex-1 hidden md:flex border-r border-gray-400">
                <div className="flex flex-col justify-center"> 
                    <span className="font-semibold text-lg"> {title} </span>
                    <span className="text-gray-400"> {street} </span>
                </div>
            </div>

            <div className="flex flex-row h-full items-center gap-2 px-2 ">
                <CiFlag1 className="size-6"/>
                <CiHeart className="size-6"/>
                <FaRegEyeSlash className="size-6"/>
             </div>
        </div>
    )
}