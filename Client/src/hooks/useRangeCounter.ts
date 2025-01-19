import { useState } from "react"

const useRangeCounter = (max : number) => {
    const [counter, setCounter] = useState<number>(0);

    const next = () => {
        if(counter < max){
            setCounter(prev => prev + 1);
        }
    }

    const prev = () => {
        if(counter > 0){
            setCounter(prev => prev - 1);
        }
    }

    const goto = (n: number) => {
        if(n >= 0 && n <= max){
            setCounter(n);
        }
    }
 
    return {counter, next, prev, goto};
}

export default useRangeCounter;