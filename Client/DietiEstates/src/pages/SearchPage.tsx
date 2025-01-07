import { useRef, useState } from "react";
import { Immobile } from "../Interfaces/interfaces";
import { HouseCard } from "../components/house_card";
import MapComponent from "../components/MapComponent";
import axios from "axios";

const SearchPage = () => {
    const [immobili, setImmobili] = useState<Immobile[]>();
    const itemRefs = useRef<any>([]); // Array di riferimenti agli elementi

    const fetchImmobili = async (bounds: any) => {
        if(bounds && bounds.ne && bounds.sw){
            try {                
                const { data } = await axios.get("http://localhost:3000/immobile/bounds", { params: { neLat: bounds.ne.lat, neLon: bounds.ne.lon, swLat: bounds.sw.lat, swLon: bounds.sw.lon}});
                if(data){
                    setImmobili(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleScrollToId = (id: number) => {
        if(itemRefs && itemRefs.current && itemRefs.current[id]){
            itemRefs.current[id].scrollIntoView();
            itemRefs.current[id].pulse();
        }
    }

    return (
        <div className="h-full w-full flex bg-[#FAFAFA] overflow-hidden">
            <div className="h-full overflow-y-scroll flex-1  no-scrollbar px-6">
                <div className="flex flex-col space-y-3 p-3 items-center">
                    {immobili?.map((imm, index) => <HouseCard key={index} ref={(el) => (itemRefs.current[index] = el)} {...imm} />)}
                </div>
            </div>
            <div className="flex-1 hidden flex-col items-center justify-end space-y-2  lg:flex border-l border-gray-300 my-2 py-1">
                <div className="bg-white shadow-md rounded-lg w-11/12 flex-1 flex flex-col p-4 " >

                </div>
                <div className="w-11/12 flex-1">
                    <MapComponent className="shadow-sm" onMove={fetchImmobili} markers={immobili?.map((imm) => ({...imm, text: imm.title}))} onMarkerClick={handleScrollToId} />
                </div>
            </div>
        </div>
    )
}

export default SearchPage;