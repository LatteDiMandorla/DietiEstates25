import { useState } from "react";
import { useSearchParams } from "react-router-dom"
import axios from "../api/axios";

export const ChangePasswordPage = () => {
    const [params] = useSearchParams();
    const token = params.get("code");

    const [password, setPassword] = useState<string>("");

    const handleClick = async () => {
        await axios.post("/auth/resetPassword", {password, token});
    }

    return (
        <div>
            Nuova password:
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleClick}>Reset</button>
        </div>
    )
}