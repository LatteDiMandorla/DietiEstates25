import { TransitionEventHandler, useEffect, useState } from "react"

export const PicturesSlideshow = ({openPictures} : {openPictures: () => void}) => {

    const [n, setN] = useState<number>(0);
    const [counter, setCounter] = useState<number>(0);
    const [change, setChange] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);

    const styles = [
        "w-96 h-56 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all duration-1000 transalte-x-7 scale-100 z-40 backdrop-blur-xl bg-white/30",
        "w-96 h-56 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all duration-1000 translate-x-80 -translate-y-28 scale-[40%] z-30",
        "w-96 h-56 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all duration-1000 translate-x-80 scale-[40%] z-20",
        "w-96 h-56 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all duration-1000 translate-x-80 translate-y-28 scale-[40%] z-10",
    ]

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

    const handleClick = () => {
        setDisabled(true);
        setN(prev => ((prev + 1) % 4));
    }

    const handleTransitionEnd : TransitionEventHandler<HTMLDivElement> = (e) => {
        if(e.propertyName == "transform"){
            setChange(true);
            setCounter(prev => prev + 1);
            setDisabled(false);
        }
    }

    return (
        <>
        <div className="flex relative items-center h-80 w-[40rem] overflow-visible">
            <div className={styles[n]} onTransitionEndCapture={handleTransitionEnd} onClick={openPictures}>
                <div className={`absolute inset-0 overflow-hidden rounded-lg scale-[220%] z-50 bg-white/15 opacity-${n == 1 ? "100" : "0"} transition-all duration-1000 backdrop-blur-sm flex justify-center items-center`}><p className="font-bold text-lg">+32</p></div>
                <img className={`w-full h-full object-cover transition-opacity ${(change && n == 1) ? "opacity-0" : "opacity-100"}`} onLoad={() => setTimeout(() => setChange(false), 200)} src={images[(Math.floor((counter + 3)/4) * 4) % images.length]} />
            </div>
            <div className={styles[(n + 1) % 4]} onClick={openPictures}>
                <div className={`absolute inset-0 overflow-hidden rounded-lg scale-[220%] z-50 bg-white/15 opacity-${n == 0 ? "100" : "0"} transition-all duration-1000 backdrop-blur-sm flex justify-center items-center`}><p className="font-bold text-lg">+32</p></div>
                <img className={`w-full h-full object-cover transition-opacity ${(change && n == 0) ? "opacity-0" : "opacity-100"}`} onLoad={() => setTimeout(() => setChange(false), 200)} src={images[(Math.floor((counter)/4) * 4 + 3) % images.length]} />
            </div>
            <div className={styles[(n + 2) % 4]} onClick={openPictures}>
                <div className={`absolute inset-0 overflow-hidden rounded-lg scale-[220%] z-50 bg-white/15 opacity-${n == 3 ? "100" : "0"} transition-all duration-1000 backdrop-blur-sm flex justify-center items-center`}><p className="font-bold text-lg">+32</p></div>
                <img className={`w-full h-full object-cover transition-opacity ${(change && n == 3) ? "opacity-0" : "opacity-100"}`} onLoad={() => setTimeout(() => setChange(false), 200)} src={images[(Math.floor((counter + 1)/4) * 4 + 2) % images.length]} />
            </div>
            <div className={styles[(n + 3) % 4]} onClick={openPictures}>
                <div className={`absolute inset-0 overflow-hidden rounded-lg scale-[220%] z-50 bg-white/15 opacity-${n == 2 ? "100" : "0"} transition-all duration-1000 backdrop-blur-sm flex justify-center items-center`}><p className="font-bold text-lg">+32</p></div>
                <img className={`w-full h-full object-cover transition-opacity ${(change && n == 2) ? "opacity-0" : "opacity-100"}`} onLoad={() => setTimeout(() => setChange(false), 200)} src={images[(Math.floor((counter + 2)/4) * 4 + 1) % images.length]} />    
            </div>
            {/* <div className={styles[1] + " z-50 bg-gray/10 backdrop-blur-sm"}></div> */}
            {/* <div className={styles[3] + " z-50 bg-gray/10 backdrop-blur-sm"}></div> */}
        </div>
        <button disabled={disabled} onClick={handleClick}>Click</button>
        </>
    )
}
