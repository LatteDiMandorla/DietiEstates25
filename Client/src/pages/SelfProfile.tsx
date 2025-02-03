import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const SelfProfilePage = () => {
    const {auth, setAuth} = useAuth();
    const axios = useAxiosPrivate();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await axios.get("/auth/logout");
        } catch (error) {
            console.log(error)
        } finally {
            setAuth(undefined);
            navigate("/login");
        }
    }

    return (
        auth &&
        <div>
            <div><img className="w-20 h-20" src={auth.image} /></div>
            <p>{auth.nome + " " + auth.cognome}</p>
            <button onClick={logout} className="bg-red-500 text-white rounded-full px-2 py-1">Logout</button>
        </div>
    )
}