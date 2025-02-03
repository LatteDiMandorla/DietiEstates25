import { useState } from "react"
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleClick = async () => {
        try{
            const {data} = await axios.post("/auth/requestResetPassword", {email, callback: "http://localhost:5173/resetPassword"});
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