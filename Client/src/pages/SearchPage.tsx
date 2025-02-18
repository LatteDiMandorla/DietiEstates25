import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../api/axios";
import { ClipLoader } from "react-spinners";

import { Filters, Immobile } from "../Interfaces/interfaces";
import { FiltersBar } from "../components/FiltersBar";
import { HouseCard, HouseCardSkeleton } from "../components/house_card";
import MapComponent, { bounds, coordinates } from "../components/MapComponent";
import MapButton from "../components/MapButton";
import ConditionalDrawer from "../components/ConditionalDrawer";

import { useScrollToElement } from "../hooks/useScrollToElement";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

const SearchPage = () => {
    const [filter, setFilter] = useState<Filters>();
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);

    const [params, setParams] = useSearchParams();
    const lat = parseFloat(params.get("lat") || "");
    const lon = parseFloat(params.get("lon") || "");
    const zoom = parseFloat(params.get("zoom") || "");
    const [bounds, setBounds] = useState<bounds>();

    const {addRef, scrollableRef, scrollToId} = useScrollToElement(() => setOpenDrawer(false));

    const { data: immobili, loading, more } = useInfiniteScroll<Immobile>(scrollableRef, async (page, pageSize, timestamp) => {
        if(bounds){
            const { data } = await axios.get("/immobile/bounds", { 
                params: { 
                    neLat: bounds?.ne.lat, 
                    neLon: bounds?.ne.lon, 
                    swLat: bounds?.sw.lat, 
                    swLon: bounds?.sw.lon,
                    page: page + 1, limit: pageSize, 
                    timestamp: timestamp
                }}
            );
    
            return {data: data.data, timestamp: data.timestamp};
        } else {
            return Promise.reject(new Error("Bounds undefined"));
        }
    }, [bounds])

    const applyFilters = () : Immobile[] | undefined => {
        if(immobili && filter) {
            let filtered = [...immobili];
            if(filter.type && filter.type.length){
                filtered = filtered.filter((imm) => filter.type.filter((t) => imm.type.toLowerCase() == t.toLowerCase()).length);
            }

            if(filter.bathrooms){
                const bathroomFilter = parseInt(filter.bathrooms) || 4;
                filtered = filtered.filter((imm) => imm.bathrooms >= bathroomFilter);
            }

            if(filter.locals && filter.locals[0] && filter.locals[1]){
                const minLocals = filter.locals[0];
                const maxLocals = filter.locals[1];
                filtered = filtered.filter((imm) => imm.locals >= minLocals && imm.locals <= maxLocals);
            }

            if(filter.price && filter.price[0] && filter.price[1]){
                const minPrice = filter.price[0];
                const maxPrice = filter.price[1];
                filtered = filtered.filter((imm) => imm.price >= minPrice && imm.price <= maxPrice);
            }

            if(filter.size && filter.size[0] && filter.size[1]){
                const minSize = filter.size[0];
                const maxSize = filter.size[1];
                filtered = filtered.filter((imm) => imm.size >= minSize && imm.size <= maxSize);
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

    const onMapMove = (bounds: bounds, center: coordinates, zoom: number) => {
        setBounds(bounds);
        scrollableRef.current?.scrollTo({top: 0});
        setParams((prev : URLSearchParams) => {
        const copy = new URLSearchParams(prev);
        copy.set('lat', center.lat.toString());
        copy.set('lon', center.lon.toString());
        copy.set('zoom', zoom.toString());
        return copy;
      });
    }

    useEffect(() => {
        console.log(filter);
    }, [filter])

    return (
        <>
        <FiltersBar setFilters={setFilter} priceRange={immobili ? [Math.min(...immobili.map(item => (item.price))), Math.max(...immobili?.map(item => item.price))]:  [2000, 400000]} sizeRange={immobili ? [Math.min(...immobili.map(item => (item.size))), Math.max(...immobili?.map(item => item.size))]:  [5, 200]} tags={[...new Set(immobili?.flatMap(item => item.tags || []))]} />
        <div className="flex-1 w-full flex bg-[#FAFAFA] overflow-hidden">
            <div className="absolute lg:hidden right-4 bottom-6 rounded-full flex justify-center items-center z-40 shadow-md"><MapButton onClick={() => setOpenDrawer(true)} /></div>
            <div className="h-full overflow-y-scroll flex-1  no-scrollbar px-6" ref={scrollableRef} >
                <div className="flex flex-col space-y-3 p-3 items-center">
                    { (loading && !applyFilters() && !applyFilters()?.length) ? 
                        Array.from({length: 5}).map((_, index) => <HouseCardSkeleton key={index} />) :
                        (applyFilters() && applyFilters()?.length ? 
                        <>
                        {applyFilters()?.map((imm, index) => <div key={index} className="w-full flex justify-center"><HouseCard ref={(e) => addRef(index, e)} {...imm} /></div>)}
                        {more ? <ClipLoader /> : <p>Risultati: {applyFilters()?.length}</p>}
                        </>
                        : <p className="font-semibold">Nessun risultato</p>    
                        )
                    }
                </div>
            </div>
            <ConditionalDrawer close={() => setOpenDrawer(false)} className="flex-1 flex-col items-center justify-end space-y-2 flex border-l border-gray-300 my-2 py-1" open={openDrawer}>
                <div className="w-11/12 flex-1">
                    <MapComponent className="shadow-sm" onMove={onMapMove} onLoad={(bounds) => setBounds(bounds)} coordinates={(lat && lon) ? {lat, lon} : undefined} zoom={zoom} markers={applyFilters()?.map((imm) => ({...imm, text: imm.title}))} onMarkerClick={scrollToId} />
                </div>
            </ConditionalDrawer>
        </div>
        </>
    )
}

export default SearchPage;