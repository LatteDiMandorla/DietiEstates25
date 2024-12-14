import { useState } from "react"

const useRangeCounter = (max : number) => {
    const [counter, setCounter] = useState<number>(0);

    const next = () => {
        if(counter < max - 1){
            setCounter(prev => prev + 1);
        }
    }

    const prev = () => {
        if(counter > 0){
            setCounter(prev => prev - 1);
        }
    }

    return {counter, next, prev};
}

export default useRangeCounter;