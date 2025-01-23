import RegisterForm from "../components/RegisterForm";
import image from "../assets/mountain-7300017.jpg";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

function RegisterPage() {
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
    return (
        <div className="flex flex-row h-full bg-[#FAFAFA]">
            <div className="w-full h-full flex-1 flex flex-col justify-center items-center space-y-6">
                <RegisterForm />
                <div className="flex space-x-1 font-semibold">
                    <div className="text-black-500 font-bold hover:cursor-pointer">Sei un'agenzia immobiliare?</div>
                    <a className="text-blue-500 font-bold hover:cursor-pointer">Registrati Ora</a>
                </div>
                <div className="flex h-min items-center justify-center">
                    <button type="submit" className="bg-gray-600 text-white font-bold px-3 py-2 rounded-full">Accedi</button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden justify-center items-center">
                <img className="object-cover w-full h-full" src={image} />
            </div>
        </div>
    )
}

export default RegisterPage;