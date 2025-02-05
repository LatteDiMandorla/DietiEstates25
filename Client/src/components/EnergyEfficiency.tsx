import { useRef } from "react";
import { GiFireFlower } from "react-icons/gi";

export const EnergyEffiency = ({efficiency} : {efficiency: string}) => {
    const ref = useRef(null)

    const efficencyToPosition = (e: string) => {
        if(e == "A") return "3%";
        else if (e == "B") return "18%";
        else if (e == "C") return "33%";
        else if (e == "D") return "48%";
        else if (e == "E") return "63%";
        else if (e == "F") return "78%";
        else if (e == "G") return "93%";
        else return "0%";
    }

    return (
        <div ref={ref} className="flex flex-col h-12 p-4 shadow-md rounded-full relative">
            <div className="h-full rounded-full w-full" style={{background: "linear-gradient(to right, #006400 0%, #32CD32 16.6%, #ADFF2F 33.2%, #FFD700 49.8%, #FFA500 66.4%, #FF4500 83%, #FF0000 100%)",}} />
            <div className="relative w-0" style={{left: efficencyToPosition(efficiency)}}>
                <div className="absolute border-solid left-2 -top-[0.5rem] border-b-white border-b-8 border-x-transparent border-x-8 border-t-0 shadow-md z-10" />
                {ref.current && <p className="absolute left-0 -top-[0.1rem] flex items-center justify-center z-10 w-8 h-8 shadow-md bg-[#FAFAFA] rounded-md font-bold text-lg">{efficiency}</p>}
            </div>
        </div>
    )
}