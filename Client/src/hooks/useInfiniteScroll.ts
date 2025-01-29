import React, { useCallback, useEffect, useState } from "react";

export const useInfiniteScroll = <T>(ref: React.RefObject<HTMLElement>, fetchData: (page: number, pageSize: number, timestamp?: Date) => Promise<{data: T[], timestamp: Date}>, deps: any[]) => {
    const [timestamp, setTimestamp] = useState<Date>();
    const [page, setPage] = useState<number>(0);
    const [more, setMore] = useState<boolean>(true);
    const [data, setData] = useState<T[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const pageSize = 5;
    const empty: boolean = !data; 

    const loadMore = useCallback(async () => {
        if (loading || !more) return;
        setLoading(true);
        try {
            const {data: newData} = await fetchData(page, pageSize, timestamp);
            setData(prevData => prevData ? [...prevData, ...newData] : newData);
            setMore(newData.length === pageSize);
            setPage(prevPage => prevPage + 1);
        } catch (error) {
            console.error('Errore nel caricamento dei dati:', error);
        } finally {
            setLoading(false);
        }
    }, [fetchData, page, pageSize, loading, more, timestamp, ...deps]);

    useEffect(() => {
        const isScrolledToBottom = () => {
            if(ref.current && (ref.current.scrollTop + ref.current.clientHeight == ref.current.scrollHeight)){
                loadMore();
            }
        }

        const element = ref.current;
        if(element) {
            element.addEventListener('scroll', isScrolledToBottom);

        }

        return () => {
            if(element) {
                element.removeEventListener('scroll', isScrolledToBottom);
            }
        }
    }, [loadMore])

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const {data: newData, timestamp: timestp} = await fetchData(0, pageSize, undefined);
                setData(newData);
                setMore(newData.length === pageSize);
                setPage(1);
                setTimestamp(timestp);
            } catch (error) {
                console.error('Errore nel caricamento dei dati:', error);
            } finally {
                setLoading(false);
            }
        }

        loadData()
    }, deps)
        
    return { data, loading, more, empty };
}