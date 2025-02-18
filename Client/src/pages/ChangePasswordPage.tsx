import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "../api/axios";
import { toast } from "react-toastify";

export const ChangePasswordPage = () => {
    const [params] = useSearchParams();
    const token = params.get("code");
    const navigate = useNavigate();

    const [password, setPassword] = useState<string>("");

    const handleClick = async () => {
        try {
            await axios.post("/auth/resetPassword", {password, token});
            toast.success("Password modificata correttamente");
            navigate("/home");
        } catch (error) {
            toast.error("Errore nella modifica della password");
            console.log(error);
        }
    }

    return (
        <div className="">
            Nuova password:
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleClick}>Reset</button>
        </div>
    )
}