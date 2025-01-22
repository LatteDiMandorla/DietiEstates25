import { LegacyRef, useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import CheckBoxList from "./CheckBoxList";
import {useClickOutside} from '../hooks/useClickOutside';
import RangeSlider from 'react-range-slider-input';
import { Rect, useRect } from 'react-use-rect';


interface DropdownMenuSingleProps {
    text: string,
    options: string[],
    icon: React.ComponentType<any>,
    selected: string,
    setSelected: React.Dispatch<React.SetStateAction<string>>, 
    className?: string,
    ref?: LegacyRef<HTMLDivElement>,
}

interface DropdownMenuMultipleProps {
    text: string,
    options: string[],
    icon: React.ComponentType<any>,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>, 
    className?: string,
    ref?: LegacyRef<HTMLDivElement>,
}

interface DropdownMenuRangeProps {
    text: string,
    min: number,
    max: number,
    step: number,
    icon: React.ComponentType<any>,
    selected: [number | undefined, number | undefined] | [],
    setSelected: React.Dispatch<React.SetStateAction<[number | undefined, number | undefined] | []>>, 
    className?: string,
    ref?: LegacyRef<HTMLDivElement>,
}

export const DropdownMenuSingle = ({text, options, icon: Icon, selected, setSelected, className = "", ref} : DropdownMenuSingleProps) => {
    const [open, setOpen] = useState<boolean>();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [rect, setRect] = useState<Rect | null>(null);
    const [rectRef] = useRect(setRect);

    useClickOutside(() => {
        setOpen(false);
    }, [buttonRef, menuRef])

    const buttonStyles = {
        default: "flex hover:cursor-pointer items-center font-semibold px-2 py-1 rounded-xl " + className + " ",
        notSelected: "border border-gray-600 ",
        selected: "border border-blue-600 bg-blue-600 border-opacity-40 bg-opacity-40 text-blue-600 ",
        open: "border border-blue-600 text-blue-600 ",
    } 

    const getPopupPosition = () => {
        if(rect?.left && rect?.left <= 0) {
            return {top: rect?.top, left: 4};
        } else if (rect?.right && rect?.right >= window.innerWidth) {
            return {top: rect?.top, right: 4};
        } else if (rect?.right && (rect?.right - rect?.width / 2) >= window.innerWidth / 2) {
            return {top: rect?.top, right: window.innerWidth - rect.right};
        } else {
            return {top: rect?.top, left: rect?.left};
        }
    }

    const handleClick = () => {
        buttonRef.current?.scrollIntoView({behavior: "instant", inline: "nearest"});
        setOpen(prev => !prev);
    }

    return (
        <div className="min-w-fit" ref={ref}>
            <button ref={buttonRef} onClick={() => handleClick()} className={buttonStyles.default + (open ? buttonStyles.open : (selected ? buttonStyles.selected : buttonStyles.notSelected))}><Icon className="mr-2" /> {text} <IoMdArrowDropdown size={20} className={"transition-all " + (open && "rotate-180") } /></button>
            <div ref={rectRef}></div>
            { open &&
                <div ref={menuRef} style={getPopupPosition()} className={`fixed bg-[#FAFAFA] shadow-lg w-fit h-fit rounded-md flex flex-col px-2 py-1 z-[1001]`}>
                    {options.map((o, index) => <div key={index} onClick={() => {setSelected(o)}} className={"hover:cursor-pointer rounded-md px-2 " + (selected == o && " bg-blue-600 bg-opacity-30")}>{o}</div>)}
                </div>
            }
        </div>

    )
}

export const DropdownMenuMultiple = ({text, options, icon: Icon, selected, setSelected, className = "", ref} : DropdownMenuMultipleProps) => {
    const [open, setOpen] = useState<boolean>();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [rect, setRect] = useState<Rect | null>(null);
    const [rectRef] = useRect(setRect);

    useClickOutside(() => {
        setOpen(false);
    }, [buttonRef, menuRef])

    const buttonStyles = {
        default: "flex hover:cursor-pointer items-center font-semibold px-2 py-1 rounded-xl " + className + " ",
        notSelected: "border border-gray-600 ",
        selected: "border border-blue-600 border-opacity-40 bg-blue-600 bg-opacity-40 text-blue-600 ",
        open: "border border-blue-600 text-blue-600 ",
    } 

    const getPopupPosition = () => {
        if(rect?.left && rect?.left <= 0) {
            return {top: rect?.top, left: 4};
        } else if (rect?.right && rect?.right >= window.innerWidth) {
            return {top: rect?.top, right: 4};
        } else if (rect?.right && (rect?.right - rect?.width / 2) >= window.innerWidth / 2) {
            return {top: rect?.top, right: window.innerWidth - rect.right};
        } else {
            return {top: rect?.top, left: rect?.left};
        }
    }

    const handleClick = () => {
        buttonRef.current?.scrollIntoView({behavior: "instant", inline: "nearest"});
        setOpen(prev => !prev);
    }

    return (
        <div className="min-w-fit" ref={ref}>
            <button ref={buttonRef} onClick={() => {handleClick()}} className={buttonStyles.default + (open ? buttonStyles.open : (selected && selected.length > 0 ? buttonStyles.selected : buttonStyles.notSelected))}><Icon className="mr-2" /> {text} <IoMdArrowDropdown size={20} className={"transition-all " + (open && "rotate-180") } /></button>
            <div ref={rectRef}></div>
            { open &&
                <div ref={menuRef} style={getPopupPosition()} className={`fixed bg-[#FAFAFA] shadow-lg w-fit h-fit rounded-md flex flex-col px-2 py-1 z-[1001]`}>
                    <div className="overflow-y-scroll mb-1">
                    <CheckBoxList elements={options} setSelected={setSelected} selected={selected} />
                    </ div>
                    <button className="bg-red-600 text-white rounded-md" onClick={() => setSelected([])}>Cancella Filtri</button>
                </div>
            }
        </div>

    )
}

export const DropdownMenuRange = ({text, min, max, step, icon: Icon, selected, setSelected, className = "", ref} : DropdownMenuRangeProps) => {
    const [open, setOpen] = useState<boolean>();
    const [internalSelected, setInternalSelected] = useState<[number | undefined, number | undefined] | []>(selected);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [rect, setRect] = useState<Rect | null>(null);
    const [rectRef] = useRect(setRect);

    useClickOutside(() => {
        setSelected(internalSelected);
        setOpen(false);
    }, [buttonRef, menuRef])

    useEffect(() => {
        setInternalSelected(selected);
    }, [selected])

    const buttonStyles = {
        default: "flex hover:cursor-pointer items-center font-semibold px-2 py-1 rounded-xl " + className + " ",
        notSelected: "border border-gray-600 ",
        selected: "border border-blue-600 border-opacity-40 bg-blue-600 bg-opacity-40 text-blue-600 ",
        open: "border border-blue-600 text-blue-600 ",
    } 

    const getPopupPosition = () => {
        if(rect?.left && rect?.left <= 0) {
            return {top: rect?.top, left: 4};
        } else if (rect?.right && rect?.right >= window.innerWidth) {
            return {top: rect?.top, right: 4};
        } else if (rect?.right && (rect?.right - rect?.width / 2) >= window.innerWidth / 2) {
            return {top: rect?.top, right: window.innerWidth - rect.right};
        } else {
            return {top: rect?.top, left: rect?.left};
        }
    }

    const handleMinInput = (val: string) => {
        if(val && parseInt(val)) {
            const numVal = parseInt(val);
            if(numVal <= min) {
                setInternalSelected([min, internalSelected[1]]);
            } else if (internalSelected[1] && numVal >= internalSelected[1]) {
                setInternalSelected([internalSelected[1], internalSelected[1]]);
            } else {
                setInternalSelected([numVal, internalSelected[1]]);
            }
        } else {
            setInternalSelected([undefined, internalSelected[1]]);
        }
    }

    const handleMaxInput = (val: string) => {
        if(val && parseInt(val)) {
            const numVal = parseInt(val);
            if (numVal >= max) {
                setInternalSelected([internalSelected[0], max]);
            } else if (internalSelected[0] && numVal <= internalSelected[0]) {
                setInternalSelected([internalSelected[0], internalSelected[0]]);
            } else {
                setInternalSelected([internalSelected[0], numVal]);
            }
        } else {
            setInternalSelected([internalSelected[0], undefined]);
        }
    }

    const handleClick = () => {
        buttonRef.current?.scrollIntoView({behavior: "instant", inline: "nearest"});
        setOpen(prev => {prev && setSelected(internalSelected); return !prev});
    }

    return (
        <div className="min-w-fit" ref={ref}>
            <button type="button" ref={buttonRef} onClick={() => handleClick()} className={buttonStyles.default + (open ? buttonStyles.open : (internalSelected && internalSelected.length > 0 ? buttonStyles.selected : buttonStyles.notSelected))}><Icon className="mr-2" /> {text} <IoMdArrowDropdown size={20} className={"transition-all " + (open && "rotate-180") } /></button>
            <div ref={rectRef}></div>
                <div ref={menuRef} style={getPopupPosition()} className={`fixed bg-[#FAFAFA] shadow-lg w-64 rounded-md flex flex-col px-2 py-1 z-[1001] ${open ? "visible" : "invisible"}`}>
                    <div className="h-28 mb-1 flex flex-col justify-around">
                        <div className="flex justify-between space-x-12">
                            <input value={internalSelected[0] || ""} min={min} max={internalSelected[1]} step={step} className="w-1/2 border p-1 rounded-md" type="number" placeholder="Da:" onChange={(e) => handleMinInput(e.target.value)} />
                            <input value={internalSelected[1] || ""} min={internalSelected[0]} max={max} step={step} className="w-1/2 border p-1 rounded-md" type="number" placeholder="A: " onChange={(e) => handleMaxInput(e.target.value)} />
                        </div>
                        <div>
                            <RangeSlider value={[internalSelected[0] || min, internalSelected[1] || max]} min={min} max={max} step={step} onInput={(value: [number, number]) => setInternalSelected(value)} />
                        </div>
                        <div className="flex justify-between mt-2">
                            <p>{internalSelected[0] || min}</p>
                            <p>{internalSelected[1] || max}</p>
                        </div>
                    </ div>
                    <button className="bg-red-600 text-white rounded-md" onClick={() => setInternalSelected([])}>Cancella Filtri</button>
                </div>
        </div>

    )
}