import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        console.log("Refresh");
        const response = await axios.get('auth/refresh', {
            withCredentials: true,
        }); 
        setAuth({accessToken: response.data});
        return response.data;
    }

    return refresh;
}

export default useRefreshToken;