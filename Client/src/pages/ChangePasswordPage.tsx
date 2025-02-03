import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "../api/axios";

export const ChangePasswordPage = () => {
    const [params] = useSearchParams();
    const token = params.get("code");
    const navigate = useNavigate();

    const [password, setPassword] = useState<string>("");

    const handleClick = async () => {
        try {
            const {data} = await axios.post("/auth/resetPassword", {password, token});
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            Nuova password:
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleClick}>Reset</button>
        </div>
    )
}