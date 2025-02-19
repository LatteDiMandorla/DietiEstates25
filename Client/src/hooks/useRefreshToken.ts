import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        console.log("Refresh");
        const {data} = await axios.get('auth/refresh', {
            withCredentials: true,
        }); 
        setAuth(prev => ({...prev, accessToken: data.accessToken, ruolo: data.ruolo}));
        return data.accessToken;
    }

    return refresh;
}

export default useRefreshToken;