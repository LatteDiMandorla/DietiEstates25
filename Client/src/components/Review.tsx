import { MdStarOutline } from "react-icons/md";
import { ReviewComponents } from "../Interfaces/interfaces";
import { MdStar } from "react-icons/md";

export const Review = (props: ReviewComponents) =>
{
    
    {/*Function to set color to Stars */}
    const setStarColor = () =>
    {
        switch (props.TotalPoint)
        {
            case 1:
                return <h2 className="flex flex-row items-center justify-between gap-1 mr-6">
                        <MdStar className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStar>
                        <MdStarOutline className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStarOutline>
                        <MdStarOutline className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStarOutline>
                        <MdStarOutline className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStarOutline>
                        <MdStarOutline className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStarOutline>
                       </h2>
            case 2:
                return <h2 className="flex flex-row items-center justify-between gap-1 mr-6">
                        <MdStar className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStar>
                        <MdStar className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStar>
                        <MdStarOutline className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStarOutline>
                        <MdStarOutline className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStarOutline>
                        <MdStarOutline className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStarOutline>
                       </h2>
            case 3:
                return <h2 className="flex flex-row items-center justify-between gap-1 mr-6">
                        <MdStar className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStar>
                        <MdStar className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStar>
                        <MdStar className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStar>
                        <MdStarOutline className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStarOutline>
                        <MdStarOutline className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStarOutline>
                       </h2>


            case 4:
                return <h2 className="flex flex-row items-center justify-between gap-1 mr-6">
                        <MdStar className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStar>
                        <MdStar className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStar>
                        <MdStar className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStar>
                        <MdStar className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStar>
                        <MdStarOutline className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStarOutline>
                       </h2>


            case 5:
                return <h2 className="flex flex-row items-center justify-between gap-1 mr-6">
                        <MdStar className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStar>
                        <MdStar className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStar>
                        <MdStar className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStar>
                        <MdStar className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStar>
                        <MdStar className="w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4 text-blue-800"></MdStar>
                       </h2>
        }
    }

    return (
        <div className="bg-white w-full h-full rounded-md flex items-start justify-center flex-row">
            <header className="bg-white lg:w-1/3 md:w-1/3 w-1/2 h-20 flex flex-row">

                <div className="bg-white w-1/3 h-full flex justify-center items-center">
                    <button className="bg-gray-200 h-14 w-14 lg:w-2/3 lg:h-2/3 rounded-full">
                        <img 
                            src={props.UserImage}  
                            className="w-full h-full object-cover rounded-full" 
                        />
                    </button>
                </div>
                <h1 className="bg-white lg:w-18 w-2/3 h-full flex flex-col mt-1">
                    <span className="mt-2 mr-1 md:text-xl lg:text-base text-blue-800 truncate">{props.NameAndSurname}</span>
                    <h2> {setStarColor()} </h2>

                </h1>
            </header>

            <div className="bg-white lg:w-2/3 md:w-2/3 w-1/2 h-full border-l border-gray-200 flex flex-col">
                <div className="w-full h-8 flex justify-center items-center">
                    <h1 className="font-bold">
                        {props.ReviewTitle}
                    </h1>
                </div>
                <div className="ml-1">
                    {props.Text}
                </div>
            </div>
            
        </div>

    );
}