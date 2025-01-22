import { FaRegBuilding } from "react-icons/fa"
import { MdOutlineMeetingRoom } from "react-icons/md";
import { LuToilet } from "react-icons/lu";
import { RxRulerSquare } from "react-icons/rx";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { HiOutlineSparkles } from "react-icons/hi";
import { MdFilterListOff } from "react-icons/md";

import { DropdownMenuMultiple, DropdownMenuRange, DropdownMenuSingle } from "./DropdownMenu"
import { useEffect, useRef, useState } from "react"
import { Filters } from "../Interfaces/interfaces"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface FilterBarProps {
    setFilters: (f: Filters) => void,
}

export const FiltersBar = ({setFilters} : FilterBarProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const [type, setType] = useState<Filters["type"]>([]);
    const [locals, setLocals] = useState<Filters["locals"]>([]);
    const [bathrooms, setBathrooms] = useState<Filters["bathrooms"]>("");
    const [price, setPrice] = useState<Filters["price"]>([]);
    const [size, setSize] = useState<Filters["size"]>([]);
    const [others, setOthers] = useState<Filters["others"]>([]);

    const resetFilters = () => {
        setType([]);
        setLocals([]);
        setPrice([]);
        setSize([]);
        setBathrooms("");
        setOthers([]);
    }

    useEffect(() => {
        setFilters({
            type,
            locals,
            bathrooms,
            price,
            size,
            others
        })
    }, [type, locals, bathrooms, price, size, others])

    return (
        <div className="bg-[#DDF5FF] w-full h-16 flex items-center px-1 space-x-2 py-2">
            <div className="flex-1 w-full items-center flex overflow-scroll no-scrollbar" ref={ref}>
                <div className="sticky left-0 flex items-center bg-gray-300/60 h-fit w-fit rounded-full z-30 lg:hidden"><IoIosArrowBack className={`hover:cursor-pointer hover:text-blue-500`} size={28} onClick={() => {ref.current?.scrollBy({left: -ref.current?.clientWidth / 1.5, behavior: "smooth"})}} /></div>
                <div className="flex flex-1 items-center h-full space-x-5 pr-10">
                    <DropdownMenuMultiple text="Tipo" selected={type} setSelected={setType} icon={FaRegBuilding} options={["Casa", "Villa", "Appartamento"]} />
                    <DropdownMenuRange min={1} max={10} step={1} selected={locals} setSelected={setLocals} text="Locali" icon={MdOutlineMeetingRoom} />
                    <DropdownMenuSingle selected={bathrooms} setSelected={setBathrooms} text="Bagni" icon={LuToilet} options={["1", "2", "3", "4 o più"]} />
                    <DropdownMenuRange min={1} max={10} step={1} selected={price} setSelected={setPrice} text="Prezzo" icon={RiMoneyEuroCircleLine} />
                    <DropdownMenuRange min={1} max={10} step={1} selected={size} setSelected={setSize} text="Metri Quadri" icon={RxRulerSquare} />
                    <DropdownMenuMultiple text="Caratteristiche" selected={others} setSelected={setOthers} icon={HiOutlineSparkles} options={["con Giardino", "Vicino alla scuola", "Vicino al parco"]} />
                </div>
                <div className="sticky right-0 flex items-center bg-gray-300/60 h-fit w-fit rounded-full z-30 lg:hidden"><IoIosArrowForward className={`hover:cursor-pointer hover:text-blue-500`} size={28} onClick={() => {ref.current?.scrollBy({left: ref.current?.clientWidth / 1.5, behavior: "smooth"})}} /></div>
            </div>
            <button className="bg-red-600 w-fit rounded-lg text-white px-2 py-1 hidden md:block" onClick={resetFilters} >Cancella i filtri</button>
            <button className="flex items-center justify-center bg-red-600 w-8 h-8 rounded-lg text-white md:hidden" onClick={resetFilters} ><MdFilterListOff size={24} /></button>
        </div>
    )
}