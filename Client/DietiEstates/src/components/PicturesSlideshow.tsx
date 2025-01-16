import { TransitionEventHandler, useState } from "react"
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useInterval } from "react-interval-hook";
export const PicturesSlideshow = ({openPictures, images, className = ""} : {openPictures: (imgIndex: number, pos: number) => void, images: string[], className?: string}) => {

    const [n, setN] = useState<number>(0);
    const [counter, setCounter] = useState<number>(0);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [fw, setFw] = useState<boolean>(false);

    const {stop} = useInterval(() => {
        handleClickNext();
    }, 4000, {autoStart: true})

    const styles = [
        "w-96 h-56 hover:cursor-pointer top-12 max-w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all  duration-500 transalte-x-7 scale-100 backdrop-blur-xl bg-white/30 z-0",
        "w-96 h-56 hover:cursor-pointer top-12  max-w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all duration-500 translate-y-44 translate-x-28 md:translate-x-80 md:-translate-y-28 scale-[40%] z-10",
        "w-96 h-56 hover:cursor-pointer top-12  max-w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all duration-500 translate-y-44 translate-x-28 md:translate-x-80 md:-translate-y-28 scale-[40%] z-20",
        "w-96 h-56 hover:cursor-pointer top-12  max-w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all duration-500 translate-y-44 translate-x-28 md:translate-x-80 md:-translate-y-28 scale-[40%] z-30",
        "w-96 h-56 hover:cursor-pointer top-12  max-w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all duration-500 translate-y-44 translate-x-0  md:translate-y-0 md:translate-x-80 scale-[40%] z-40",
        "w-96 h-56 hover:cursor-pointer top-12  max-w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all duration-500 translate-y-44 -translate-x-28 md:translate-x-80 md:translate-y-28 scale-[40%] z-50",
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

    const getPictureIndex = (pos: number) => {
        if(pos == 0){
            return (Math.floor((counter + 4)/6) * 6) % images.length;
        } else if (pos == 1){
            return (Math.floor((counter + 5)/6) * 6 + (6 * images.length - 1)) % images.length;
        } else if (pos == 2){
            return (Math.floor((counter)/6) * 6 + 4) % images.length;
        } else if (pos == 3) {
            return (Math.floor((counter + 1)/6) * 6 + 3) % images.length;
        } else if (pos == 4) {
            return (Math.floor((counter + 2)/6) * 6 + 2) % images.length;
        } else {
            return (Math.floor((counter + 3)/6) * 6 + 1) % images.length;
        }
    }   

    return (
        <>

        <div className={"flex relative h-96 mb-16 w-96 max-w-full md:mb-0 md:h-80 md:w-[40rem] overflow-visible select-none " + className}>
            <div className="flex absolute top-4 justify-between items-center w-full max-w-96 px-4">
                <button disabled={disabled} onClick={() => {stop(true) ;handleClickPrev()}}><IoIosArrowBack className="hover:cursor-pointer hover:text-blue-500" size={30} /></button>
                <p>{(counter + 6 * images.length) % images.length + 1} / {images.length}</p>
                <button disabled={disabled} onClick={() => {stop(true) ;handleClickNext()}}><IoIosArrowForward className="hover:cursor-pointer hover:text-blue-500" size={30} /></button>
            </div>
            <div className={styles[n]} onTransitionEndCapture={(e) => (n == 0 && handleTransitionEnd(e))} onClick={() => openPictures(getPictureIndex(0), n)}>
                <div className={`absolute inset-0 overflow-hidden rounded-lg scale-[220%] z-50 bg-white/15 ${n == 2 || n == 3 ? "visible opacity-100" : "invisible opacity-0"}  transition-all duration-[1200ms] backdrop-blur-lg flex justify-center items-center`}><p className="font-bold text-lg">{n == 3 && "+"+(images.length - 4)}</p></div>
                <img className={`w-full h-full object-cover`} src={images[(Math.floor((counter + 4)/6) * 6) % images.length]} />
            </div>
            <div className={styles[(n + 1) % 6]} onTransitionEndCapture={(e) => (n == 5 && handleTransitionEnd(e))} onClick={() => openPictures(getPictureIndex(1), (n + 1) % 6)}>
                <div className={`absolute inset-0 overflow-hidden rounded-lg scale-[220%] z-50 bg-white/15 ${n == 1 || n == 2 ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-[1200ms] backdrop-blur-lg flex justify-center items-center`}><p className="font-bold text-lg">{n == 2 && "+"+(images.length - 4)}</p></div>
                <img className={`w-full h-full object-cover`}src={images[(Math.floor((counter + 5)/6) * 6 + (6 * images.length - 1)) % images.length]} />
            </div>
            <div className={styles[(n + 2) % 6]} onTransitionEndCapture={(e) => (n == 4 && handleTransitionEnd(e))} onClick={() => openPictures(getPictureIndex(2), (n + 2) % 6)}>
                <div className={`absolute inset-0 overflow-hidden rounded-lg scale-[220%] z-50 bg-white/15 ${n == 0 || n == 1 ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-[1200ms] backdrop-blur-lg flex justify-center items-center`}><p className="font-bold text-lg">{n == 1 && "+"+(images.length - 4)}</p></div>
                <img className={`w-full h-full object-cover`}src={images[(Math.floor((counter)/6) * 6 + 4) % images.length]} />
            </div>
            <div className={styles[(n + 3) % 6]} onTransitionEndCapture={(e) => (n == 3 && handleTransitionEnd(e))} onClick={() => openPictures(getPictureIndex(3), (n + 3) % 6)}>
                <div className={`absolute inset-0 overflow-hidden rounded-lg scale-[220%] z-50 bg-white/15 ${n == 5 || n == 0 ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-[1200ms] backdrop-blur-lg flex justify-center items-center`}><p className="font-bold text-lg">{n == 0 && "+"+(images.length - 4)}</p></div>
                <img className={`w-full h-full object-cover`}src={images[(Math.floor((counter + 1)/6) * 6 + 3) % images.length]} />
            </div>
            <div className={styles[(n + 4) % 6]} onTransitionEndCapture={(e) => (n == 2 && handleTransitionEnd(e))} onClick={() => openPictures(getPictureIndex(4), (n + 4) % 6)}>
                <div className={`absolute inset-0 overflow-hidden rounded-lg scale-[220%] z-50 bg-white/15 ${n == 4 || n == 5 ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-[1200ms] backdrop-blur-lg flex justify-center items-center`}><p className="font-bold text-lg">{n == 5 && "+"+(images.length - 4)}</p></div>
                <img className={`w-full h-full object-cover`} src={images[(Math.floor((counter + 2)/6) * 6 + 2) % images.length]} />
            </div>
            <div className={styles[(n + 5) % 6]} onTransitionEndCapture={(e) => (n == 1 && handleTransitionEnd(e))} onClick={() => openPictures(getPictureIndex(5), (n + 5) % 6)}>
                <div className={`absolute inset-0 overflow-hidden rounded-lg scale-[220%] z-50 bg-white/15 ${n == 3 || n == 4 ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-[1200ms] backdrop-blur-lg flex justify-center items-center`}><p className="font-bold text-lg">{n == 4 && "+"+(images.length - 4)}</p></div>
                <img className={`w-full h-full object-cover`} src={images[(Math.floor((counter + 3)/6) * 6 + 1) % images.length]} />    
            </div>
            {/* <div className={styles[1] + " z-50 bg-gray/10 backdrop-blur-sm"}></div> */}
            {/* <div className={styles[3] + " z-50 bg-gray/10 backdrop-blur-sm"}></div> */}
        </div>
        </>
    )
}
