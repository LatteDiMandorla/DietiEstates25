import { useState } from "react";
import { PicturesSlideshow } from "../components/PicturesSlideshow";

function ImmobilePage(){
    const [openImage, setOpenImage] = useState(false); 
    const images = [
        "https://cataas.com/cat?unique=" + (Date.now() + Math.random()),
        "https://cataas.com/cat?unique=" + (Date.now() + Math.random()),
        "https://cataas.com/cat?unique=" + (Date.now() + Math.random()),
        "https://cataas.com/cat?unique=" + (Date.now() + Math.random()),
        "https://cataas.com/cat?unique=" + (Date.now() + Math.random()),
        "https://cataas.com/cat?unique=" + (Date.now() + Math.random()),
        "https://cataas.com/cat?unique=" + (Date.now() + Math.random()),
        "https://cataas.com/cat?unique=" + (Date.now() + Math.random()),
        "https://cataas.com/cat?unique=" + (Date.now() + Math.random()),
    ]

    return (
        <div className="p-4 bg-[#FAFAFA] h-full w-full">
            <PicturesSlideshow openPictures={() => setOpenImage(true)} />
            <div className={`absolute inset-0 bg-white/30 backdrop-blur-sm z-[150] hover:cursor-pointer ${openImage ? "block" : "hidden"}`} onClick={() => setOpenImage(false)}></div>
            <div className={`absolute inset-16 bg-[#FAFAFA] z-[200] rounded-md shadow-md ${openImage ? "block" : "hidden"} overflow-scroll`}>
                <div className="flex flex-wrap gap-2 p-2">
                    {images.map((url, i) => <div className="w-64 h-36 overflow-hidden rounded-md" key={i}><img className="w-full h-full object-cover" src={`${url}?unique=${Date.now()}-${Math.random()}`} /></div>)}
                </div>
            </div>
        </div>
    )
}

export default ImmobilePage;