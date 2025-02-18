import { useEffect, useState } from "react"
import { Utente } from "../Interfaces/interfaces"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import InviteForm from "../components/InviteForm";
import { useNavigate } from "react-router-dom";

export const AdminPage = () => {
    const {auth, setAuth} = useAuth();
    const navigate = useNavigate();
    const [admin, setAdmin] = useState<Utente[]>([]);
    const axios = useAxiosPrivate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const {data} = await axios.get("/amministrazione");
                setAdmin(data);
            } catch (error) {
                console.log(error);
            }
        } 

        fetch();
    }, [auth])

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
        <div className="w-full h-full bg-[#FAFAFA]">
            {admin.map((a) => <div>{a.nome + " " + a.cognome}</div>)}
            <div className="flex flex-col">
                <InviteForm />
                <button onClick={logout} className="bg-red-500 text-white rounded-full px-2 py-1">Logout</button>
            </div>
        </div>
    )
}