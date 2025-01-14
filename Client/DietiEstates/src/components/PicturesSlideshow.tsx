import { TransitionEventHandler, useState } from "react"
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
export const PicturesSlideshow = ({openPictures, images} : {openPictures: () => void, images: string[]}) => {

    const [n, setN] = useState<number>(0);
    const [counter, setCounter] = useState<number>(0);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [fw, setFw] = useState<boolean>(false);

    const styles = [
        "w-96 h-56 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all duration-1000 transalte-x-7 scale-100 backdrop-blur-xl bg-white/30 z-40",
        "w-96 h-56 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all duration-1000 translate-x-80 -translate-y-28 scale-[40%] z-0",
        "w-96 h-56 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all duration-1000 translate-x-80 -translate-y-28 scale-[40%] z-10",
        "w-96 h-56 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all duration-1000 translate-x-80 -translate-y-28 scale-[40%] z-30",
        "w-96 h-56 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all duration-1000 translate-x-80 scale-[40%] z-20",
        "w-96 h-56 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all duration-1000 translate-x-80 translate-y-28 scale-[40%] z-10",
    ]

    const handleClickNext = () => {
        setFw(true);
        setN(prev => ((prev + 1) % 6));
        setDisabled(true);
    }

    const handleClickPrev = () => {
        setFw(false);
        setN(prev => (prev == 0 ? 5 : prev - 1));
        setDisabled(true);
    }

    const handleTransitionEnd : TransitionEventHandler<HTMLDivElement> = (e) => {
        if(e.propertyName == "transform"){
            setCounter(prev => (fw ? prev + 1 : (prev + 6 * images.length - 1) % (6 * images.length)));
            setDisabled(false);
        }
    }

    return (
        <>

        <div className="flex relative items-center h-80 w-[40rem] overflow-visible">
            <div className="flex absolute left-6 top-4 justify-between items-center w-80 overflow-visible">
                <button disabled={disabled} onClick={handleClickPrev}><IoIosArrowBack size={22} /></button>
                <button disabled={disabled} onClick={handleClickNext}><IoIosArrowForward size={22} /></button>
            </div>
            <div className={styles[n]} onTransitionEndCapture={(e) => (n == 0 && handleTransitionEnd(e))} onClick={openPictures}>
                <div className={`absolute inset-0 overflow-hidden rounded-lg scale-[220%] z-50 bg-white/15 opacity-${n == 2 || n == 3 ? "100" : "0"} transition-all duration-[1200ms] backdrop-blur-lg flex justify-center items-center`}><p className="font-bold text-lg">{n == 3 && "+"+(images.length - 4)}</p></div>
                <img className={`w-full h-full object-cover`} src={images[(Math.floor((counter + 4)/6) * 6) % images.length]} />
            </div>
            <div className={styles[(n + 1) % 6]} onTransitionEndCapture={(e) => (n == 5 && handleTransitionEnd(e))} onClick={openPictures}>
                <div className={`absolute inset-0 overflow-hidden rounded-lg scale-[220%] z-50 bg-white/15 opacity-${n == 1 || n == 2 ? "100" : "0"} transition-all duration-[1200ms] backdrop-blur-lg flex justify-center items-center`}><p className="font-bold text-lg">{n == 2 && "+"+(images.length - 4)}</p></div>
                <img className={`w-full h-full object-cover`}src={images[(Math.floor((counter + 5)/6) * 6 + (6 * images.length - 1)) % images.length]} />
            </div>
            <div className={styles[(n + 2) % 6]} onTransitionEndCapture={(e) => (n == 4 && handleTransitionEnd(e))} onClick={openPictures}>
                <div className={`absolute inset-0 overflow-hidden rounded-lg scale-[220%] z-50 bg-white/15 opacity-${n == 0 || n == 1 ? "100" : "0"} transition-all duration-[1200ms] backdrop-blur-lg flex justify-center items-center`}><p className="font-bold text-lg">{n == 1 && "+"+(images.length - 4)}</p></div>
                <img className={`w-full h-full object-cover`}src={images[(Math.floor((counter)/6) * 6 + 4) % images.length]} />
            </div>
            <div className={styles[(n + 3) % 6]} onTransitionEndCapture={(e) => (n == 3 && handleTransitionEnd(e))} onClick={openPictures}>
                <div className={`absolute inset-0 overflow-hidden rounded-lg scale-[220%] z-50 bg-white/15 opacity-${n == 5 || n == 0 ? "100" : "0"} transition-all duration-[1200ms] backdrop-blur-lg flex justify-center items-center`}><p className="font-bold text-lg">{n == 0 && "+"+(images.length - 4)}</p></div>
                <img className={`w-full h-full object-cover`}src={images[(Math.floor((counter + 1)/6) * 6 + 3) % images.length]} />
            </div>
            <div className={styles[(n + 4) % 6]} onTransitionEndCapture={(e) => (n == 2 && handleTransitionEnd(e))} onClick={openPictures}>
                <div className={`absolute inset-0 overflow-hidden rounded-lg scale-[220%] z-50 bg-white/15 opacity-${n == 4 || n == 5 ? "100" : "0"} transition-all duration-[1200ms] backdrop-blur-lg flex justify-center items-center`}><p className="font-bold text-lg">{n == 5 && "+"+(images.length - 4)}</p></div>
                <img className={`w-full h-full object-cover`} src={images[(Math.floor((counter + 2)/6) * 6 + 2) % images.length]} />
            </div>
            <div className={styles[(n + 5) % 6]} onTransitionEndCapture={(e) => (n == 1 && handleTransitionEnd(e))} onClick={openPictures}>
                <div className={`absolute inset-0 overflow-hidden rounded-lg scale-[220%] z-50 bg-white/15 opacity-${n == 3 || n == 4 ? "100" : "0"} transition-all duration-[1200ms] backdrop-blur-lg flex justify-center items-center`}><p className="font-bold text-lg">{n == 4 && "+"+(images.length - 4)}</p></div>
                <img className={`w-full h-full object-cover`} src={images[(Math.floor((counter + 3)/6) * 6 + 1) % images.length]} />    
            </div>
            {/* <div className={styles[1] + " z-50 bg-gray/10 backdrop-blur-sm"}></div> */}
            {/* <div className={styles[3] + " z-50 bg-gray/10 backdrop-blur-sm"}></div> */}
        </div>
        </>
    )
}
