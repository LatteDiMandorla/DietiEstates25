import { useEffect, useRef, useState } from "react";
import { Filters, Immobile } from "../Interfaces/interfaces";
import { HouseCard, HouseCardSkeleton } from "../components/house_card";
import MapComponent from "../components/MapComponent";
import axios from "../api/axios";
import ConditionalDrawer from "../components/ConditionalDrawer";
import MapButton from "../components/MapButton";
import { FiltersBar } from "../components/FiltersBar";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
    const [immobili, setImmobili] = useState<Immobile[]>();
    const [isLoading, setIsLoading] = useState<boolean>();
    const [filter, setFilter] = useState<Filters>();
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const itemRefs = useRef<any>([]); // Array di riferimenti agli elementi
    const [bounds, setBounds] = useState<{ne: {lat: number, lon: number}, sw: {lat: number, lon: number}}>();
    const ref = useRef<HTMLDivElement>(null);
    const [timestamp, setTimestamp] = useState<string>();
    const [page, setPage] = useState<number>(1);
    const [ended, setEnded] = useState<boolean>(false);
    const pageSize = 5;

    const [params, setParams] = useSearchParams();
    const lat = params.get("lat");
    const lon = params.get("lon");

    const fetchImmobili = async (bounds: any, page = 1) => {
        if(bounds && bounds.ne && bounds.sw){
            try {                
                setIsLoading(true);
                const { data } = await axios.get("/immobile/bounds", 
                    { params: { 
                        neLat: bounds.ne.lat, 
                        neLon: bounds.ne.lon, 
                        swLat: bounds.sw.lat, 
                        swLon: bounds.sw.lon, 
                        page: page, limit: pageSize, 
                        timestamp: timestamp}}
                );


                if(data){
                    setImmobili(data.data);
                    setTimestamp(data.timestamp);
                    setTimeout(() =>  setIsLoading(false), 1000);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        //console.log(filter);
    }, [filter])

    useEffect(() => {
        const fetchImmobili = async () => {
            if(lat && lon && parseFloat(lat) && parseFloat(lon)){
                try {                
                    setIsLoading(true);
                    const { data } = await axios.get("/immobile/bounds", 
                        { params: { 
                            lat, lon,
                            page: 1, limit: pageSize, 
                            timestamp: timestamp}}
                    );
    
    
                    if(data){
                        setImmobili(data.data);
                        setTimestamp(data.timestamp);
                        setTimeout(() =>  setIsLoading(false), 1000);
                        setPage(1);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        console.log(lat, lon);
        fetchImmobili();
    }, [lat, lon])

    const handleScrollToId = (id: number) => {
        if(itemRefs && itemRefs.current && itemRefs.current[id]){
            setOpenDrawer(false);
            itemRefs.current[id].scrollIntoView();
            itemRefs.current[id].pulse();
        }
    }

    const handleScroll = async () => {
        if(ref.current && (ref.current.scrollTop + ref.current.clientHeight == ref.current.scrollHeight) && !isLoading && !ended){
            if(lat && lon && parseFloat(lat) && parseFloat(lon)){
                try {                
                    setIsLoading(true);
                    const { data } = await axios.get("/immobile/bounds", 
                        { params: { 
                            lat, lon,
                            page: page + 1, limit: pageSize, 
                            timestamp: timestamp}}
                    );
    
                    if(data && data.data && data.data.length){
                        setImmobili(prev => (prev ? [...prev, ...data.data] : data.data));
                        setTimestamp(data.timestamp);
                        setPage(prev => prev + 1);
                    } else {
                        setEnded(true);
                    }
                    setIsLoading(false);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    const applyFilters = () => {
        if(immobili && filter) {
            let filtered = [...immobili];
            if(filter.bathrooms){
                const bathroomFilter = parseInt(filter.bathrooms) || 4;
                filtered = filtered.filter((imm) => parseInt(imm.bathrooms) >= bathroomFilter);
            }

            if(filter.locals && filter.locals[0] && filter.locals[1]){
                const minLocals = filter.locals[0];
                const maxLocals = filter.locals[1];
                filtered = filtered.filter((imm) => parseInt(imm.locals) >= minLocals && parseInt(imm.locals) <= maxLocals);
            }

            if(filter.price && filter.price[0] && filter.price[1]){
                const minPrice = filter.price[0];
                const maxPrice = filter.price[1];
                filtered = filtered.filter((imm) => parseInt(imm.price) >= minPrice && parseInt(imm.locals) <= maxPrice);
            }

            if(filter.size && filter.size[0] && filter.size[1]){
                const minSize = filter.size[0];
                const maxSize = filter.size[1];
                filtered = filtered.filter((imm) => parseInt(imm.price) >= minSize && parseInt(imm.size) <= maxSize);
            }

            if(filter.type){
                filtered = filtered.filter((imm) => imm);
            }

            if(filter.others && filter.others.length > 0) {
                filtered = filtered.filter((imm) => {
                    if(imm.tags && imm.tags.length > 0){
                        for(let i = 0; i < filter.others.length; i++){
                            if(!imm.tags.includes(filter.others[i])){
                                return false;
                            }
                        }
                        return true;
                    }
                    return false;
                })
            }

            return filtered;
        }

        return immobili;
    }

    return (
        <>
        <FiltersBar setFilters={setFilter} />
        <div className="flex-1 w-full flex bg-[#FAFAFA] overflow-hidden">
            <div className="absolute lg:hidden right-4 bottom-6 rounded-full flex justify-center items-center z-40 shadow-md"><MapButton onClick={() => setOpenDrawer(true)} /></div>
            <div className="h-full overflow-y-scroll flex-1  no-scrollbar px-6" ref={ref} onScroll={handleScroll}>
                <div className="flex flex-col space-y-3 p-3 items-center">
                    { isLoading ? 
                        Array.from({length: 5}).map((_, index) => <HouseCardSkeleton key={index} />) :
                        (applyFilters() && applyFilters()?.length ? 
                        applyFilters()?.map((imm, index) => <div className="w-full flex justify-center"><HouseCard key={index} ref={(el) => (itemRefs.current[index] = el)} {...imm} /></div>)
                        : <p className="font-semibold">Nessun risultato</p>    
                        )
                    }
                </div>
            </div>
            <ConditionalDrawer close={() => setOpenDrawer(false)} className="flex-1 flex-col items-center justify-end space-y-2 flex border-l border-gray-300 my-2 py-1" open={openDrawer}>
                <div className="w-11/12 flex-1">
                    <MapComponent className="shadow-sm" onMove={(b: any) => setBounds(b)} markers={applyFilters()?.map((imm) => ({...imm, text: imm.title}))} onMarkerClick={handleScrollToId} />
                </div>
            </ConditionalDrawer>
        </div>
        </>
    )
}

export default SearchPage;