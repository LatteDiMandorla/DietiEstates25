import ImageUploading, { ImageType } from 'react-images-uploading';
import { TransitionEventHandler, useState } from "react"
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useInterval } from "react-interval-hook";
import { BiImageAdd } from "react-icons/bi";
import { PictureListPopover } from './PictureListPopover';
export const PicturesSlideshowUploader = ({openPictures, className = ""} : {openPictures: (imgIndex: number, pos: number) => void, className?: string}) => {

    const [open, setOpen] = useState<boolean>(false);
    const [images, setFiles] = useState<ImageType[]>([]);
    const [selected, setSelected] = useState<number>(0);


    const styles = [
        "w-96 h-56 hover:cursor-pointer top-12 max-w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all  duration-500 transalte-x-7 scale-100 backdrop-blur-xl bg-white/30 z-0",
        "w-96 h-56 hover:cursor-pointer top-12  max-w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all duration-500 translate-y-44 translate-x-28 md:translate-x-80 md:-translate-y-28 scale-[40%] z-10",
        "w-96 h-56 hover:cursor-pointer top-12  max-w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all duration-500 translate-y-44 translate-x-0  md:translate-y-0 md:translate-x-80 scale-[40%] z-40",
        "w-96 h-56 hover:cursor-pointer top-12  max-w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all duration-500 translate-y-44 -translate-x-28 md:translate-x-80 md:translate-y-28 scale-[40%] z-50",
    ]

    return (
        <ImageUploading multiple value={images} onChange={(imagesList) => setFiles(imagesList)} maxNumber={20}>
        { ({imageList: images, onImageUpload, dragProps}) =>
        <>
        <div className={"flex relative h-96 mb-16 w-96 max-w-full md:mb-0 md:h-80 md:w-[40rem] overflow-visible select-none " + className} {...dragProps}>
            <div className={styles[0]} onClick={() => images.length < 1 ? onImageUpload() : setOpen(true)}>
                <img className={`w-full h-full object-cover`} src={images[0]?.dataURL} />
            </div>
            <div className={styles[3]} onClick={() => images.length < 2 ? onImageUpload() : setOpen(true)}>
                <img className={`w-full h-full object-cover`} src={images[1]?.dataURL} />
            </div>
            <div className={styles[2]} onClick={() => images.length < 3 ? onImageUpload() : setOpen(true)}>
                <img className={`w-full h-full object-cover`} src={images[2]?.dataURL} />
            </div>
            <div className={styles[1]} onClick={onImageUpload}>
                <div className={`absolute inset-0 overflow-hidden rounded-lg scale-[220%] z-50 bg-white/15 transition-all duration-[1200ms] backdrop-blur-lg flex justify-center items-center`}><BiImageAdd color='black' size={30} /></div>
                <img className={`w-full h-full object-cover`} src={images[3]?.dataURL} />    
            </div>
            {/* <div className={styles[1] + " z-50 bg-gray/10 backdrop-blur-sm"}></div> */}
            {/* <div className={styles[3] + " z-50 bg-gray/10 backdrop-blur-sm"}></div> */}
        </div>
        </>
        }
        </ ImageUploading>
    )
}