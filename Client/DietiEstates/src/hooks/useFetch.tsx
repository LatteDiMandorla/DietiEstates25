import axios from "../api/axios";
import { useEffect, useState } from "react";

const useFetch = <T, >({url, dep = []} : {url: string, dep?: Array<any>}) => {
    const [data, setData] = useState<T>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const {data: d} = await axios.get(url);
                setData(d);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, dep)

    return {data, isLoading, setData};
}

export default useFetch;