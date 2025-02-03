import { useEffect, useState } from "react"
import { Utente } from "../Interfaces/interfaces"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import InviteForm from "../components/InviteForm";

export const AdminPage = () => {
    const {auth} = useAuth();
    const [admin, setAdmin] = useState<Utente[]>([]);
    const axios = useAxiosPrivate();

    const [mail, setMail] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [cognome, setCognome] = useState<string>("");

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

    return (
        <div className="w-full h-full bg-[#FAFAFA]">
            {admin.map((a) => <div>{a.nome + " " + a.cognome}</div>)}
            <div className="flex flex-col">
                <InviteForm />
            </div>
        </div>
    )
}