import ImageUploading, { ImageType } from 'react-images-uploading';
import { useState } from "react"
import { BiImageAdd, BiImageAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { ResponsiveFullscreenPopup } from './ResponsiveFullscreenPopup';
import { RiCloseFill } from 'react-icons/ri';
export const PicturesSlideshowUploader = ({ className = ""} : {className?: string}) => {

    const [open, setOpen] = useState<boolean>(false);
    const [images, setFiles] = useState<ImageType[]>([]);
    
    const handleClick = () => {
        console.log(images);
    }


    const styles = [
        "w-96 h-56 hover:cursor-pointer top-12 max-w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all  duration-500 transalte-x-8 scale-100 backdrop-blur-xl bg-white/30 z-0",
        "w-96 h-56 hover:cursor-pointer top-12  max-w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all duration-500 translate-y-44 translate-x-28 md:translate-x-80 md:-translate-y-28 scale-[40%] z-10",
        "w-96 h-56 hover:cursor-pointer top-12  max-w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all duration-500 translate-y-44 translate-x-0  md:translate-y-0 md:translate-x-80 scale-[40%] z-20",
        "w-96 h-56 hover:cursor-pointer top-12  max-w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 absolute left-0 overflow-hidden rounded-lg transition-all duration-500 translate-y-44 -translate-x-28 md:translate-x-80 md:translate-y-28 scale-[40%] z-30",
    ]

    return (
        <ImageUploading multiple value={images} onChange={(imagesList) => setFiles(imagesList.slice(0, 20))}>
        { ({imageList: images, onImageUpload, onImageUpdate, dragProps, onImageRemove}) =>
        <>
        <div className={`flex relative h-96 mb-16 w-96 hover:cursor-pointer max-w-full md:mb-0 md:h-80 md:w-[40rem] overflow-visible select-none ${className}`} >
            {images.length ? null : <div {...dragProps} onClick={onImageUpload} className='absolute inset-0 bg-white/15 z-50 backdrop-blur-sm flex justify-center items-center border-2 border-gray-300 rounded-lg'><BiImageAdd size={50} /></div>}
            <div className="flex font-bold absolute top-4 justify-center items-center w-full max-w-96 px-4">
                <p>{images.length || ""}</p>
            </div>
            <div className={styles[0]} onClick={() => images.length < 1 ? onImageUpload() : setOpen(true)}>
                {images[0]?.dataURL && <img className={`w-full h-full object-cover`} src={images[0].dataURL} />}
            </div>
            <div className={styles[3]} onClick={() => images.length < 2 ? onImageUpload() : setOpen(true)}>
                {images[1]?.dataURL && <img className={`w-full h-full object-cover`} src={images[1].dataURL} />}
            </div>
            <div className={styles[2]} onClick={() => images.length < 3 ? onImageUpload() : setOpen(true)}>
                {images[2]?.dataURL && <img className={`w-full h-full object-cover`} src={images[2].dataURL} />}
            </div>
            <div className={styles[1]} onClick={() => setOpen(true)}>
                <div className={`absolute inset-0 overflow-hidden rounded-lg scale-[220%] z-40 bg-white/15 transition-all duration-[1200ms] backdrop-blur-lg flex justify-center items-center`}>{images.length ? <HiOutlineDotsHorizontal size={30} /> : null}</div>
                {images[3]?.dataURL && <img className={`w-full h-full object-cover`} src={images[3].dataURL} />}    
            </div>
            {/* <div className={styles[1] + " z-50 bg-gray/10 backdrop-blur-sm"}></div> */}
            {/* <div className={styles[3] + " z-50 bg-gray/10 backdrop-blur-sm"}></div> */}
        </div>
        <ResponsiveFullscreenPopup open={open} close={() => setOpen(false)} className="flex flex-col">
            <div className="h-16 w-full border-b border-gray-200 flex justify-end items-center px-4 overflow-hidden font-bold">
                <button onClick={() => setOpen(false)}><RiCloseFill size={40}/></button>
            </div>
            <div {...dragProps} className="flex-1 w-full overflow-scroll no-scrollbar">
                <div className="flex flex-wrap gap-2 p-2 justify-center md:justify-start " >
                    {images.map((img, i) => 
                        <div className={`w-64 h-36 overflow-hidden rounded-md hover:cursor-pointer relative`} key={i}>
                            <div className='absolute inset-0 bg-white/15 rounded-md backdrop-blur-md opacity-0 hover:opacity-100 transition-all group flex'>
                                <div className='flex-1 h-full flex items-center justify-center border-r border-gray-300 hover:scale-125 transition-all'><MdDeleteOutline className="group-hover:block hidden" size={50} onClick={() => onImageRemove(i)}/></div>
                                <div className='flex-1 h-full items-center justify-center hover:scale-125 transition-all flex'><BiImageAlt className="group-hover:block hidden" onClick={() => onImageUpdate(i)} size={50} /></div>
                            </div>
                            <img className="w-full h-full object-cover" src={img.dataURL} />
                        </div>
                    )}
                    {images.length < 20 && 
                    <div className={`w-64 h-36 overflow-hidden rounded-md hover:cursor-pointer relative bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300`} onClick={onImageUpload}>
                        <div className='absolute inset-0 bg-white/15 rounded-md backdrop-blur-md transition-all flex justify-center items-center'><BiImageAdd size={50}/></div>
                    </div>}
                </div>
            </div>
        </ResponsiveFullscreenPopup> 
        <button onClick={handleClick}>Upload</button>
        </>
        }
        </ ImageUploading>
    )
}