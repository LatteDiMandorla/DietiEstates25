import RegisterForm from "../components/RegisterForm";
import image from "../assets/DietiRealLogo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function RegisterPage() {
    const navigate = useNavigate();
    const [imageMoved, setImageMoved] = useState(false); // Stato per gestire l'animazione

    const handleLoginNavigation = () => {
        // Attiviamo l'animazione
        setImageMoved(true);

        // Dopo 500ms (il tempo dell'animazione), navighiamo alla pagina di login
        setTimeout(() => {
            navigate("/login");
        }, 500);
    };

    return (
        <div className="flex flex-row h-full bg-[#FAFAFA]">
            {/* Sezione del form a sinistra */}
            <div className="w-full h-full flex-1 flex flex-col justify-center items-center space-y-6">
                <RegisterForm />
                <div className="flex space-x-1 font-semibold">
                    <div className="text-black-500 font-bold hover:cursor-pointer">Sei un'agenzia immobiliare?</div>
                    <a className="text-blue-500 font-bold hover:cursor-pointer">Registrati Ora</a>
                </div>
                <div className="flex space-x-1 font-semibold">
                    <div className="text-black-500 font-bold">Hai già un account?</div>
                    <div 
                        className="text-blue-500 font-bold hover:cursor-pointer hover:underline 
                        transform active:scale-95 transition-all duration-150" 
                        onClick={handleLoginNavigation}>
                        Accedi
                    </div>
                </div>
            </div>

            {/* Sezione immagine a destra con transizione */}
            <div className={`flex flex-1 overflow-hidden justify-center items-center bg-[#DDF5FF] rounded-2xl 
                ${imageMoved ? 'transform -translate-x-full' : 'transform translate-x-0'} transition-transform duration-500`}>
                <img className="object-cover w-48 h-48" src={image} />
            </div>
        </div>
    );
}

export default RegisterPage;
