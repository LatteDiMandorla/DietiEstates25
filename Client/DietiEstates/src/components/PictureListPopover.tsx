import { RiCloseFill } from "react-icons/ri";
import { ResponsiveFullscreenPopup } from "./ResponsiveFullscreenPopup";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useRef } from "react";

interface PictureListPopoverProps {
    images: string[],
    open: boolean,
    close: () => void,
    selected: number,
    goto: (i: number) => void,
    next: () => void,
    prev: () => void
}

export const PictureListPopover = ({images, open, close, selected, goto, next, prev} : PictureListPopoverProps) => {

    return (
        <ResponsiveFullscreenPopup open={open} close={close} className="flex flex-col">
            <div className="flex flex-col h-full">
            <Header selected={selected} goto={goto} close={close} />
            { selected ?
            <ImageDetail selected={selected} goto={goto} next={next} prev={prev} images={images} />
            :
            <ImagesList images={images} goto={goto} />
            }
            </div>
        </ResponsiveFullscreenPopup>
    )
}

interface HeaderProps {
    selected: number,
    goto: (i: number) => void,
    close: () => void
}

const Header = ({goto, selected, close} : HeaderProps) => {
    return (
        <div className="h-16 w-full border-b border-gray-200 flex justify-between items-center px-4 overflow-hidden font-bold">
            <button onClick={() => goto(0)} className={`${selected ? "visible" : "invisible"}`}><FaArrowLeft size={30} /></button>
                Gattini belli
            <button onClick={() => {close(); goto(0)}}><RiCloseFill size={40}/></button>
        </div>
    )
}

interface FooterProps {
    images: string[],
    selected: number,
    goto: (n: number) => void,
}

const Footer = ({images, goto, selected} : FooterProps) => {
    const itemRefs = useRef<any>([]);

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
        <div className="bottom-0 h-36 w-full overflow-x-scroll no-scrollbar">
            <div className="flex gap-6 h-full w-fit items-center px-10">
                {images.map((url, i) => 
                <div onClick={() => goto(i + 1)} ref={(el) => (itemRefs.current[i] = el)} className={`w-48 h-28 overflow-hidden rounded-md bg-gray-300 hover:cursor-pointer relative`} key={i}>
                    <img className={`w-full h-full object-cover ${selected != i + 1 && "opacity-25"} transition-all`} src={url} />
                </div>)}
            </div>
        </div>
    )
}

interface ImagesListProps {
    images: string[],
    goto: (n: number) => void,
}

const ImagesList = ({images, goto} : ImagesListProps) => {
    return (
        <div className="flex-1 w-full overflow-scroll no-scrollbar">
            <div className="flex flex-wrap gap-2 p-2 justify-center md:justify-start " >
                {images.map((url, i) => <div onClick={() => goto(i + 1)} className={`w-64 h-36 overflow-hidden rounded-md hover:cursor-pointer`} key={i}><img className="w-full h-full object-cover" src={url} /></div>)}
            </div>
        </div>
    )
}

interface ImageDetailProps {
    images: string[],
    selected: number,
    goto: (i: number) => void,
    next: () => void,
    prev: () => void
}

const ImageDetail = ({images, selected, goto, prev, next} : ImageDetailProps) => {
    return (
        <>
        <div className="flex flex-col flex-1 w-full overflow-hidden">
            <div className=" flex-1 flex relative justify-center items-center overflow-hidden">
                <div className="absolute flex items-center h-full left-4 rounded-lg"><IoIosArrowBack className="hover:cursor-pointer hover:text-blue-500" size={40} onClick={prev} /></div>
                <div className="overflow-hidden h-full flex-1 flex flex-col">
                    <div className={`flex-1 overflow-hidden rounded-md px-12`}>
                        <img className="h-full w-full object-contain" src={images[selected - 1]} />
                    </div>
                </div>
                <div className="absolute flex items-center h-full right-4 rounded-lg"><IoIosArrowForward className={`hover:cursor-pointer hover:text-blue-500`} size={40} onClick={next} /></div>
            </div>
            <div className="w-full h-fit flex items-center justify-center">
                {selected}/{images.length}
            </div>
        </div>  
        <Footer images={images} goto={goto} selected={selected} />
        </>
    )
}