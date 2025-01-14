import { useState } from "react";
import { PicturesSlideshow } from "../components/PicturesSlideshow";
import useRangeCounter from "../hooks/useRangeCounter";
import { PictureListPopover } from "../components/PictureListPopover";

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
        <div className="p-4 bg-[#FAFAFA] h-full w-full overflow-hidden">
            <PicturesSlideshow openPictures={handleImageClick} images={images} className="mx-auto md:mx-0" />
            <PictureListPopover images={images} selected={selected} next={next} prev={prev} goto={goto} open={openImage} close={() => setOpenImage(false)} />
        </div>
    )
}

export default ImmobilePage;