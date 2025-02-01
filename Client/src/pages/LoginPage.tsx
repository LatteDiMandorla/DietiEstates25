import LoginForm from "../components/LoginForm";
import image from "../assets/DietiRealLogo.png";
import AlternativeLogin from "../components/AlternativeLogin";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom"
import { useState } from "react";

function LoginPage() {
    const axios = useAxiosPrivate();
    const {setAuth} = useAuth();
    const test = async () => {
        try {
            const {data} = await axios.get("utente/self");
            alert("loggato");
        } catch (error) {
            alert("non loggato");
        }
    }

    const navigate = useNavigate();
    const [imageMoved, setImageMoved] = useState(false); // Stato per gestire l'animazione

    const handleRegisterNavigation = () => {
        // Attiviamo l'animazione
        setImageMoved(true);

        // Dopo 500ms (il tempo dell'animazione), navighiamo alla pagina di registrazione
        setTimeout(() => {
            navigate("/register");
        }, 500);
    };

    return (
        <div className="flex h-full bg-[#FAFAFA]">
            <div className={`flex flex-1 overflow-hidden justify-center items-center bg-[#DDF5FF] rounded-2xl 
                ${imageMoved ? 'transform translate-x-full' : 'transform translate-x-0'} transition-transform duration-500`}>
                <img className="object-cover w-48 h-48" src={image} />
            </div>
            <div className="w-full h-full flex-1 flex flex-col justify-center items-center space-y-6">
                <LoginForm />
                <AlternativeLogin />
                <button onClick={test}>test</button>
                <button onClick={() => setAuth(undefined)}>logut</button>
                <div className="flex space-x-1 font-semibold">
                    <div>Non hai un Account?</div>
                    <div 
                        className="text-blue-500 font-bold hover:cursor-pointer hover:underline transform active:scale-95 transition-all duration-150" 
                        onClick={handleRegisterNavigation}>
                        Registrati Ora
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;