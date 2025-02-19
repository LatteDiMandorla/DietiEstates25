import { useState } from "react"
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleClick = async () => {
        try{
            await axios.post("/auth/requestResetPassword", {email, callback: `${import.meta.env.VITE_API_URL}/resetPassword`});
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleClick}>Click</button>
        </div>
    )
}