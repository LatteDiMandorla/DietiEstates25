import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google"
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function AlternativeLogin() {
    return (
        <div className="flex flex-col items-center space-y-2">
            
        <p className="text-gray-500 font-semibold">Oppure</p>
        <div className="flex space-x-6">
            {/* <div className="flex justify-center items-center w-12 h-12 shadow-md hover:cursor-pointer rounded-md overflow-hidden"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" className="w-8 h-8" /></div> */}
            <GoogleOAuthProvider clientId="636062433221-26ukb7999d58gvm6rf5ci7brc4jvffcl.apps.googleusercontent.com">
            <GoogleAuth />
            </ GoogleOAuthProvider>
            <div className="flex justify-center items-center w-12 h-12 shadow-md hover:cursor-pointer rounded-md overflow-hidden"><img src="https://z-m-static.xx.fbcdn.net/rsrc.php/v4/yD/r/5D8s-GsHJlJ.png" className="w-8 h-8" /></div>
        </div>
        </div>
    )
}

const GoogleAuth = () => {
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const loginSuccess = async (credentialResponse: any) => {
        try {            
            const {data} = await axios.post("/auth/google", credentialResponse, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true,
            });
            setAuth({...data});
            navigate("/home");
        } catch (error) {
            
        }
    }

    const login = useGoogleLogin({
        onSuccess: loginSuccess,
        onError: () => alert('Login Failed'),
        flow: 'auth-code'
      });

    return (
        <div onClick={() => login()} className="flex justify-center items-center w-12 h-12 shadow-md hover:cursor-pointer rounded-md overflow-hidden"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" className="w-8 h-8" /></div>
    )
}

export default AlternativeLogin;