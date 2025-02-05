import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "../api/axios";
import { toast } from 'react-toastify';

export const VerifyPage = () => {
    const [params] = useSearchParams();
    const code = params.get("code");
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            if(code){
                await axios.get("/auth/verify", {params: {token: code}});
                toast.success("Account verificato");
                navigate("/login");
            }
        }

        verify();
    }, [])

    return (
        null
    )
}