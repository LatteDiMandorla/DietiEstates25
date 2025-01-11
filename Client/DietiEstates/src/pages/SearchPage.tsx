import { useEffect, useRef, useState } from "react";
import { Immobile } from "../Interfaces/interfaces";
import { HouseCard, HouseCardSkeleton } from "../components/house_card";
import MapComponent from "../components/MapComponent";
import axios from "../api/axios";
import { FaRegBuilding } from "react-icons/fa";
import { FaRegMap } from "react-icons/fa";
import ConditionalDrawer from "../components/ConditionalDrawer";
import {DropdownMenuMultiple, DropdownMenuSingle} from "../components/DropdownMenu";
import MapButton from "../components/MapButton";

const SearchPage = () => {
    const [immobili, setImmobili] = useState<Immobile[]>();
    const [isLoading, setIsLoading] = useState<boolean>();
    const [filter, setFilter] = useState<string[]>();
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const itemRefs = useRef<any>([]); // Array di riferimenti agli elementi

    const fetchImmobili = async (bounds: any) => {
        if(bounds && bounds.ne && bounds.sw){
            try {                
                setIsLoading(true);
                const { data } = await axios.get("/immobile/bounds", { params: { neLat: bounds.ne.lat, neLon: bounds.ne.lon, swLat: bounds.sw.lat, swLon: bounds.sw.lon}});
                if(data){
                    setImmobili(data);
                    setTimeout(() =>  setIsLoading(false), 1000);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        console.log(filter);
    }, [filter])

    const handleScrollToId = (id: number) => {
        if(itemRefs && itemRefs.current && itemRefs.current[id]){
            setOpenDrawer(false);
            itemRefs.current[id].scrollIntoView();
            itemRefs.current[id].pulse();
        }
    }

    return (
        <>
        <div className="bg-[#DDF5FF] w-full h-16 flex justify-around items-center">
            <DropdownMenuSingle options={["Opzione 1", "Opzione 2", "Opzione 3"]} />
            <DropdownMenuMultiple text="Tipo" options={["Opzione 1", "Opzione 2", "Opzione 3", "Opzione 4", "Opzione 5", "Opzione 6"]} icons={FaRegBuilding} />
        </div>
        <div className="h-full w-full flex bg-[#FAFAFA] overflow-hidden">
            <div className="absolute lg:hidden mt-1 right-4 rounded-full flex justify-center items-center"><MapButton onClick={() => setOpenDrawer(true)} /></div>
            <div className="h-full overflow-y-scroll flex-1  no-scrollbar px-6">
                <div className="flex flex-col space-y-3 p-3 items-center">
                    { isLoading ? 
                        Array.from({length: 5}).map(() => <HouseCardSkeleton />) :
                        (immobili ? 
                        immobili?.filter((imm) => !filter || filter.length == 0 || filter?.some(f => imm.tags?.includes(f))).map((imm, index) => <HouseCard key={index} ref={(el) => (itemRefs.current[index] = el)} {...imm} />)
                        : <p>Nessun risultato</p>    
                        )
                    }
                </div>
            </div>
            <ConditionalDrawer close={() => setOpenDrawer(false)} className="flex-1 flex-col items-center justify-end space-y-2 flex border-l border-gray-300 my-2 py-1" open={openDrawer}>
                <div className="w-11/12 flex-1">
                    <MapComponent className="shadow-sm" onMove={fetchImmobili} markers={immobili?.filter((imm) => !filter || filter.length == 0 || filter?.some(f => imm.tags?.includes(f))).map((imm) => ({...imm, text: imm.title}))} onMarkerClick={handleScrollToId} />
                </div>
            </ConditionalDrawer>
        </div>
        </>
    )
}

export default SearchPage;