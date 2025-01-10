import { useEffect } from 'react';

export function useClickOutside(callback: () => void, refs: React.RefObject<HTMLElement>[]) {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (refs.every(ref => ref.current && !ref.current.contains(event.target as Node))) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);
        return () => {
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [refs]);
}