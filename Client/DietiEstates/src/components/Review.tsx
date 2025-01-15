import { MdStarOutline } from "react-icons/md";
import { useState } from 'react'

export const Review = () =>
{
    {/*useState to color stars*/}
    const number_of_star : number = 2;
    const [starColor, setStarColor] = useState<number>(number_of_star);

    return (
        <div className="bg-white w-full h-96 rounded-md flex items-start justify-center flex-row">
            <header className="bg-white lg:w-1/3 md:w-1/3 w-1/2 h-20 flex flex-row">

                <div className="bg-white w-1/3 h-full flex justify-center items-center">
                    <button className="relative bg-gray-200 h-14 w-14 lg:w-2/3 lg:h-2/3 rounded-full">

                    </button>
                </div>
                <h1 className="bg-white lg:w-18 w-2/3 h-full flex flex-col mt-1">
                    <span className="mt-2 mr-1 md:text-xl lg:text-base text-blue-800 truncate">Mario rossi</span>
                    <h2 className="flex flex-row items-center justify-between gap-1 mr-6">
                        <MdStarOutline className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStarOutline>
                        <MdStarOutline className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStarOutline>
                        <MdStarOutline className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStarOutline>
                        <MdStarOutline className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStarOutline>
                        <MdStarOutline className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStarOutline>
                    </h2>

                </h1>
            </header>

            <div className="bg-white lg:w-2/3 md:w-2/3 w-1/2 h-full border-l border-gray-200 flex flex-col">
                <div className="w-full h-10 flex justify-center items-center">
                    <h1 className="font-bold">
                        TITOLO RECENSIONE
                    </h1>
                </div>
                <div className="p-2">
                    Text here
                </div>
            </div>
            
        </div>

    );
}