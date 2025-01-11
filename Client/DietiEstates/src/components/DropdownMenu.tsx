import { useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import CheckBoxList from "./CheckBoxList";
import {useClickOutside} from '../hooks/useClickOutside';
import RangeSlider from 'react-range-slider-input';

interface DropdownMenuSingleProps {
    options: string[],
}

interface DropdownMenuMultipleProps {
    text: string,
    options: string[],
    icons: React.ComponentType<any>,
}

interface DropdownMenuRangeProps {
    text: string,
    min: number,
    max: number,
    step: number,
    icon: React.ComponentType<any>,
}

export const DropdownMenuSingle = ({options} : DropdownMenuSingleProps) => {
    const [selected, setSelected] = useState<string>(options[0]);
    const [open, setOpen] = useState<boolean>();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useClickOutside(() => {
        setOpen(false);
    }, [buttonRef, menuRef])

    const buttonStyles = {
        default: "flex hover:cursor-pointer items-center font-semibold px-2 py-1 rounded-xl ",
        notSelected: "border border-gray-600 ",
        selected: "bg-blue-600 bg-opacity-40 text-blue-600 ",
        open: "border border-blue-600 text-blue-600 ",
    } 

    return (
        <div>
            <button ref={buttonRef} onClick={() => {setOpen(prev => !prev)}} className={buttonStyles.default + (open ? buttonStyles.open : (selected ? buttonStyles.selected : buttonStyles.notSelected))}>{selected} <IoMdArrowDropdown size={20} className={"transition-all " + (open && "rotate-180") } /></button>
            { open &&
            <div className="relative z-[1001]">
                <div ref={menuRef} className="absolute bg-[#FAFAFA] shadow-lg w-24 max-h-32 rounded-md flex flex-col p-2 ">
                    {options.map((o) => <div onClick={() => {setSelected(o)}} className={"hover:cursor-pointer " + (selected == o && " bg-blue-600")}>{o}</div>)}
                </div>
            </div>
            }
        </div>

    )
}

export const DropdownMenuMultiple = ({text, options, icons: Icon} : DropdownMenuMultipleProps) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [open, setOpen] = useState<boolean>();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useClickOutside(() => {
        setOpen(false);
    }, [buttonRef, menuRef])

    const buttonStyles = {
        default: "flex hover:cursor-pointer items-center font-semibold px-2 py-1 rounded-xl ",
        notSelected: "border border-gray-600 ",
        selected: "bg-blue-600 bg-opacity-40 text-blue-600 ",
        open: "border border-blue-600 text-blue-600 ",
    } 

    return (
        <div>
            <button ref={buttonRef} onClick={() => {setOpen(prev => !prev)}} className={buttonStyles.default + (open ? buttonStyles.open : (selected && selected.length > 0 ? buttonStyles.selected : buttonStyles.notSelected))}><Icon /> {text} <IoMdArrowDropdown size={20} className={"transition-all " + (open && "rotate-180") } /></button>
            { open &&
            <div className="relative z-[1001]">
                <div ref={menuRef} className="absolute bg-[#FAFAFA] shadow-lg w-36 max-h-36 rounded-md flex flex-col px-2 py-1 ">
                    <div className="overflow-y-scroll mb-1">
                    <CheckBoxList elements={options} setSelected={setSelected} selected={selected} />
                    </ div>
                    <button className="bg-red-600 text-white rounded-md" onClick={() => setSelected([])}>Cancella Filtri</button>
                </div>
            </div>
            }
        </div>

    )
}

export const DropdownMenuRange = ({text, min, max, step, icon: Icon} : DropdownMenuRangeProps) => {
    const [selected, setSelected] = useState<number[]>([min, max]);
    const [open, setOpen] = useState<boolean>();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useClickOutside(() => {
        setOpen(false);
    }, [buttonRef, menuRef])

    const buttonStyles = {
        default: "flex hover:cursor-pointer items-center font-semibold px-2 py-1 rounded-xl ",
        notSelected: "border border-gray-600 ",
        selected: "bg-blue-600 bg-opacity-40 text-blue-600 ",
        open: "border border-blue-600 text-blue-600 ",
    } 

    return (
        <div>
            <button ref={buttonRef} onClick={() => {setOpen(prev => !prev)}} className={buttonStyles.default + (open ? buttonStyles.open : (selected && selected.length > 0 ? buttonStyles.selected : buttonStyles.notSelected))}><Icon /> {text} <IoMdArrowDropdown size={20} className={"transition-all " + (open && "rotate-180") } /></button>
            { open &&
            <div className="relative z-[1001]">
                <div ref={menuRef} className="absolute bg-[#FAFAFA] shadow-lg w-64 max-h-36 rounded-md flex flex-col px-2 py-1 right-0 ">
                    <div className="h-16 mb-1 flex flex-col justify-center">
                        <RangeSlider value={selected} min={min} max={max} step={step} onInput={(value: number[]) => setSelected(value)} />
                        <div className="flex justify-between mt-2">
                            <p>{selected[0] || 1}k$</p>
                            <p>{selected[1] || 1}k$</p>
                        </div>
                    </ div>
                    <button className="bg-red-600 text-white rounded-md" onClick={() => setSelected([])}>Cancella Filtri</button>
                </div>
            </div>
            }
        </div>

    )
}