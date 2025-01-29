import { useRef } from "react";

export const useScrollToElement = (onScroll?: () => void) => {
    const itemRefs = useRef<any>([]); // Array di riferimenti agli elementi
    const scrollableRef = useRef<HTMLDivElement>(null);

    const addRef = (index: number, el: any) => (itemRefs.current[index] = el)
    const scrollToId = (id: number) => {
        if(itemRefs && itemRefs.current && itemRefs.current[id]){
            onScroll?.();
            itemRefs.current[id].scrollIntoView();
        }
    }

    return {addRef, scrollableRef, scrollToId}
}