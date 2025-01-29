import React, { useState } from "react";

export const useInfiniteScroll = (ref: React.RefObject<any>, fetch: (page: number, pageSize: number, timestamp?: Date) => Promise<{more: boolean, timeStamp: Date}> | {more: boolean, timeStamp: Date}) => {
    const [timestamp, setTimestamp] = useState<Date>();
    const [page, setPage] = useState<number>(1);
    const [more, setMore] = useState<boolean>(true);
    const [started, setStarted] = useState<boolean>(false);
    const pageSize = 5;

    const handleScroll = async () => {
        if(ref.current && (ref.current.scrollTop + ref.current.clientHeight == ref.current.scrollHeight) && !started && more){
            setStarted(true);
            const {more, timeStamp} = await fetch?.(page, pageSize, timestamp)
            if(more) {
                setPage(page + 1);
                timestamp || setTimestamp(timeStamp);
            } else {
                setMore(false);
            }
            setStarted(false);
        }
    }

    return {more, handleScroll}
}