import { useEffect, useState } from "react";
import { PicturesSlideshow } from "../components/PicturesSlideshow";
import useRangeCounter from "../hooks/useRangeCounter";
import { PictureListPopover } from "../components/PictureListPopover";

import { CiFlag1 } from "react-icons/ci";
import { FaDoorOpen, FaRegEyeSlash, FaRulerCombined } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import {Appointement} from "../components/Appointement";
import { Immobile } from "../Interfaces/interfaces";
import axios from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { PiToiletFill } from "react-icons/pi";
import MapComponent from "../components/MapComponent";
import { EnergyEffiency } from "../components/EnergyEfficiency";

function ImmobilePage(){
    const [immobile, setImmobile] = useState<Immobile>();
    const {id} = useParams();
    const [openImage, setOpenImage] = useState(false); 
    const {counter: selected, next, prev, goto} = useRangeCounter(immobile ? immobile?.images.length : 1);

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
                    console.log(data);
                    setImmobile(data);
                }
            }
        }

        fetch();
    }, [id])


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
                    {immobile?.description}
                </p>
            </div>
            <div className="w-full p-2 border-t border-gray-400">
                <p className="text-lg font-semibold">Caratteristiche:</p>
                <div className="flex gap-4 flex-wrap">
                    {immobile?.tags.map(t => <p>•{t}</p>)}
                </div>
            </div>
            <div className="w-full p-4 border-t border-gray-400">
                <p className="text-lg font-semibold">Efficienza Energetica:</p>
                <p className="text-wrap break-words whitespace-pre-wrap">
                    {immobile && <EnergyEffiency efficiency={immobile?.efficienza} />}
                </p>
            </div>
            <div className="w-full h-96 p-2 border-t border-gray-400">
                {immobile && <MapComponent markers={[{...immobile, text: ""}]} coordinates={(immobile.lat && immobile.lon) ? {lat: immobile?.lat, lon: immobile?.lon} : undefined} />}
            </div>
        </div>
        <div className="h-full w-fit sticky top-0 hidden lg:block">
            {immobile && immobile.id && immobile.orari && <Appointement id={immobile.id} times={immobile.orari.map(o => new Date(o))} agente={immobile.Agente}/>}
        </div>
    </div>
    </>
    )
}

export default ImmobilePage;

export const InformationTopBar = ({price, locals, size, bathrooms, title, street} : Immobile) => {
    const navigate = useNavigate();

    const prezzoFormattato = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
      }).format(price);

    return (
        <div className="bg-[#FFFFFF] h-16 flex items-center w-full z-[100] shadow-md">
            <div className="flex items-center h-full flex-1 md:flex-none px-4 gap-4 border-r border-gray-400">
                <FaArrowLeft className="hover:cursor-pointer" onClick={() => navigate(-1)} />
                <div className="flex flex-col"> 
                    <span className="text-lg font-semibold"> {prezzoFormattato} </span>
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