import { FaRegBuilding } from "react-icons/fa"
import { MdOutlineMeetingRoom } from "react-icons/md";
import { LuToilet } from "react-icons/lu";
import { RxRulerSquare } from "react-icons/rx";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { HiOutlineSparkles } from "react-icons/hi";

import { DropdownMenuMultiple, DropdownMenuRange, DropdownMenuSingle } from "./DropdownMenu"
import { useEffect, useState } from "react"
import { Filters } from "../Interfaces/interfaces"

interface FilterBarProps {
    setFilters: (f: Filters) => void,
}

export const FiltersBar = ({setFilters} : FilterBarProps) => {
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
        console.log({
            type,
            locals,
            bathrooms,
            price,
            size,
            others
        });

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
        <div className="bg-[#DDF5FF] w-full h-16 flex justify-center items-center px-1 space-x-2 py-2">
            <div className="flex-1">
                <div className="flex items-center h-full space-x-5 px-1">
                    <DropdownMenuMultiple text="Tipo" selected={type} setSelected={setType} icon={FaRegBuilding} options={["Casa", "Villa", "Appartamento"]} />
                    <DropdownMenuRange min={1} max={10} step={1} selected={locals} setSelected={setLocals} text="Locali" icon={MdOutlineMeetingRoom} />
                    <DropdownMenuSingle selected={bathrooms} setSelected={setBathrooms} text="Bagni" icon={LuToilet} options={["1", "2", "3", "4 o più"]} />
                    <DropdownMenuRange min={1} max={10} step={1} selected={price} setSelected={setPrice} text="Prezzo" icon={RiMoneyEuroCircleLine} />
                    <DropdownMenuRange min={1} max={10} step={1} selected={size} setSelected={setSize} text="Metri Quadri" icon={RxRulerSquare} />
                    <DropdownMenuMultiple text="Caratteristiche" selected={others} setSelected={setOthers} icon={HiOutlineSparkles} options={["con Giardino", "Vicino alla scuola", "Vicino al parco"]} />
                </div>
            </div>
            <button className="bg-red-600 min-w-fit rounded-lg text-white px-2 py-1" onClick={resetFilters} >Cancella i filtri</button>
        </div>
    )
}